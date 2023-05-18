import pygame
import pygame_gui
import time
import sys
import xml.etree.ElementTree as ET
from xml.dom import minidom
import os
import numpy as np
import cv2 as cv

APP_CAPTION = 'License Plate: Data creator'
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
FRAME_RATE = 120

WHITE = pygame.Color(255, 255, 255)
BLACK = pygame.Color(50, 50, 50)
GREEN = pygame.Color(61, 195, 115)

DATASET_RAWS_PATH = './dataset/raws'
DATASET_IMAGES_PATH = './dataset/images'
DATASET_ANNOTATIONS_PATH = './dataset/annotations'

def create_annotation_xml(filename, width, height, depth, xmin, ymin, xmax, ymax):
    root = ET.Element("annotation")

    folder_elem = ET.SubElement(root, "folder")
    folder_elem.text = "images"

    filename_elem = ET.SubElement(root, "filename")
    filename_elem.text = f'{filename}.jpg'

    size_elem = ET.SubElement(root, "size")
    width_elem = ET.SubElement(size_elem, "width")
    width_elem.text = str(width)
    height_elem = ET.SubElement(size_elem, "height")
    height_elem.text = str(height)
    depth_elem = ET.SubElement(size_elem, "depth")
    depth_elem.text = str(depth)

    segmented_elem = ET.SubElement(root, "segmented")
    segmented_elem.text = "0"

    object_elem = ET.SubElement(root, "object")
    name_elem = ET.SubElement(object_elem, "name")
    name_elem.text = "licence"
    pose_elem = ET.SubElement(object_elem, "pose")
    pose_elem.text = "Unspecified"
    truncated_elem = ET.SubElement(object_elem, "truncated")
    truncated_elem.text = "0"
    occluded_elem = ET.SubElement(object_elem, "occluded")
    occluded_elem.text = "0"
    difficult_elem = ET.SubElement(object_elem, "difficult")
    difficult_elem.text = "0"

    bndbox_elem = ET.SubElement(object_elem, "bndbox")
    xmin_elem = ET.SubElement(bndbox_elem, "xmin")
    xmin_elem.text = str(xmin)
    ymin_elem = ET.SubElement(bndbox_elem, "ymin")
    ymin_elem.text = str(ymin)
    xmax_elem = ET.SubElement(bndbox_elem, "xmax")
    xmax_elem.text = str(xmax)
    ymax_elem = ET.SubElement(bndbox_elem, "ymax")
    ymax_elem.text = str(ymax)

    xmlstr = minidom.parseString(ET.tostring(root)).toprettyxml(indent="   ")
    with open(f'{DATASET_ANNOTATIONS_PATH}/{filename}.xml', "w") as f:
        f.write(xmlstr)

class PlusLine:
  def __init__(self) -> None:
    self.pos_start_line_vez = pygame.math.Vector2(SCREEN_WIDTH/2, 0)
    self.pos_end_line_vez = pygame.math.Vector2(SCREEN_WIDTH/2, SCREEN_HEIGHT)
    self.pos_start_line_hoz = pygame.math.Vector2(0, SCREEN_HEIGHT/2)
    self.pos_end_line_hoz = pygame.math.Vector2(SCREEN_WIDTH, SCREEN_HEIGHT/2)
    self.color = GREEN
    self.thickness = 1

  def draw(self, surface: pygame.Surface) -> None:
    pygame.draw.line( surface, self.color,self.pos_start_line_vez, self.pos_end_line_vez, self.thickness)
    pygame.draw.line( surface, self.color, self.pos_start_line_hoz, self.pos_end_line_hoz, self.thickness)

  def update(self, delta_time) -> None:
    _mouse_pos = pygame.mouse.get_pos()
    self.pos_start_line_vez.x = _mouse_pos[0]
    self.pos_end_line_vez.x = _mouse_pos[0]
    self.pos_start_line_hoz.y = _mouse_pos[1]
    self.pos_end_line_hoz.y = _mouse_pos[1]

class BoundingBox:
  def __init__(self) -> None:
    self.pos_start = pygame.math.Vector2(0, 0)
    self.pos_end = pygame.math.Vector2(0, 0)
    self.color = GREEN
    self.is_setted_start_pos = False
    self.is_setted_end_pos = False

  def draw(self, surface: pygame.Surface) -> None:
    if self.is_setted_start_pos:
      width = abs(self.pos_end.x - self.pos_start.x)
      height = abs(self.pos_end.y - self.pos_start.y)
      rect = pygame.Rect(self.pos_start.x, self.pos_start.y, width, height)
      alpha_surf = pygame.Surface(pygame.Rect(rect).size)
      alpha_surf.set_alpha(150)
      pygame.draw.rect(alpha_surf, self.color, alpha_surf.get_rect())
      surface.blit(alpha_surf, rect)

  def update(self, delta_time) -> None:
    if self.is_setted_start_pos and not self.is_setted_end_pos:
      _mouse_pos = pygame.mouse.get_pos()
      self.pos_end.x = _mouse_pos[0]
      self.pos_end.y = _mouse_pos[1]

  def set_start_pos(self, pos: pygame.math.Vector2) :
    self.pos_start = pos
    self.is_setted_start_pos = True

  def set_end_pos(self, pos: pygame.math.Vector2) :
    self.pos_end = pos
    self.is_setted_end_pos = True

  def reset(self):
    self.pos_start = pygame.math.Vector2(0, 0)
    self.pos_end = pygame.math.Vector2(0, 0)
    self.is_setted_start_pos = False
    self.is_setted_end_pos = False

class Frame:
  def __init__(self, surface: pygame.Surface) -> None:
    self.surface = surface
    self.image_path = None
    self.image_cv: np.matrix = None
    self.is_open_dialog = False
    self.plus_line = PlusLine()
    self.bouding_box = BoundingBox()
    self.__config_ui_elements()

  def __config_ui_elements(self) -> None:
    self.ui_manager = pygame_gui.UIManager((SCREEN_WIDTH, SCREEN_HEIGHT))
    _rect = pygame.Rect(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 100, 20)
    self.ui_label_mouse_pos = pygame_gui.elements.UILabel(
      text="(0,0)",
      relative_rect=_rect,
      manager=self.ui_manager,
    )

    _rect = pygame.Rect(0, 0, 120, 35)
    self.ui_btn_load_image = pygame_gui.elements.UIButton(
      relative_rect=_rect,
      text='Load image',
      manager=self.ui_manager)
    self.ui_btn_load_image.set_position(pygame.math.Vector2(20, 20))

    _rect = pygame.Rect(0, 0, 100, 35)
    self.ui_btn_reset = pygame_gui.elements.UIButton(
      relative_rect=_rect,
      text='Reset',
      manager=self.ui_manager)
    self.ui_btn_reset.set_position(pygame.math.Vector2(160, 20))

    _rect = pygame.Rect(0, 0, 120, 35)
    self.ui_btn_save_result = pygame_gui.elements.UIButton(
      relative_rect=_rect,
      text='Save result',
      manager=self.ui_manager)
    self.ui_btn_save_result.set_position(pygame.math.Vector2(280, 20))

  def events(self, event: pygame.event.Event) -> None:
    self.ui_manager.process_events(event)
    if event.type == pygame_gui.UI_BUTTON_PRESSED:
      if event.ui_element == self.ui_btn_load_image:
        self.is_open_dialog = True
        self.__open_file_dialog()
        return
      if event.ui_element == self.ui_btn_reset:
        self.bouding_box.reset()
        return
      if event.ui_element == self.ui_btn_save_result:
        self.__save_result()
        return
    if event.type == pygame_gui.UI_FILE_DIALOG_PATH_PICKED:
      if event.ui_element == self.file_dialog:
        self.is_open_dialog = False
        self.__handle_load_image(event.text)
        return
    if pygame.mouse.get_pressed()[0]:
      _mouse_pos = pygame.mouse.get_pos()
      if (self.is_open_dialog or (_mouse_pos[0] < 500 and _mouse_pos[1] < 60)):
        return
      if not self.bouding_box.is_setted_start_pos:
        self.bouding_box.set_start_pos(pygame.math.Vector2(_mouse_pos[0], _mouse_pos[1]))
      elif self.bouding_box.is_setted_start_pos and not self.bouding_box.is_setted_end_pos:
        if _mouse_pos[0] - self.bouding_box.pos_start.x < 10:
          return
        if _mouse_pos[1] - self.bouding_box.pos_start.y < 10:
          return
        self.bouding_box.set_end_pos(pygame.math.Vector2(_mouse_pos[0], _mouse_pos[1]))
      return
    
  def render(self, surface: pygame.Surface) -> None:
    if self.image_cv is not None: 
      surface.blit(self.surf_image, self.rect_image)
      surface.blit(self.surf_text, self.rect_text)
    self.plus_line.draw(self.surface)
    self.bouding_box.draw(self.surface)
    self.ui_manager.draw_ui(surface)

  def update(self, delta_time: float) -> None:
    self.ui_manager.update(delta_time)
    self.plus_line.update(delta_time)
    self.bouding_box.update(delta_time)
    _mouse_pos = pygame.mouse.get_pos()
    if (self.image_cv is not None):
      self.ui_label_mouse_pos.set_text(f'({_mouse_pos[0]-self.rect_image.left}, {_mouse_pos[1]-self.rect_image.top})')
    else:
      self.ui_label_mouse_pos.set_text(f'({_mouse_pos[0]}, {_mouse_pos[1]})')
    self.ui_label_mouse_pos.set_position(pygame.math.Vector2(_mouse_pos[0], _mouse_pos[1]))


  def __open_file_dialog(self):
    self.is_select_image = True
    _rect = pygame.Rect(0, 0, 650, 450)
    _rect.center = pygame.math.Vector2(SCREEN_WIDTH//2, SCREEN_HEIGHT//2)
    self.file_dialog = pygame_gui.windows.UIFileDialog(
      rect = _rect,
      window_title = 'Choose image (●''◡''●)',
      initial_file_path = os.path.dirname(f'{DATASET_RAWS_PATH}/'),
      manager = self.ui_manager)
    
  def __handle_load_image(self, path):
    self.image_path = os.path.basename(path)
    self.bouding_box.reset()
    self.image_cv = cv.imread(path)
    self.image_cv = cv.cvtColor(self.image_cv, cv.COLOR_BGR2RGB)
    self.image_cv = cv.transpose(self.image_cv)
    self.image_width = 800
    _image_scale_ratio = self.image_width / self.image_cv.shape[0]
    self.image_height = int(self.image_cv.shape[1] * _image_scale_ratio)
    self.image_cv = cv.resize(self.image_cv, (self.image_height, self.image_width))
    self.__config_surf_image()
    self.__config_rect_image()
    self.__config_text()

  def __config_surf_image(self):
    self.surf_image = pygame.surfarray.make_surface(self.image_cv).convert_alpha()

  def __config_rect_image(self):
    self.rect_image = self.surf_image.get_rect()
    self.rect_image.center = pygame.math.Vector2(SCREEN_WIDTH//2, SCREEN_HEIGHT//2)

  def __config_text(self):
    _str = f'{self.image_path}: {self.image_cv.shape[0]} x {self.image_cv.shape[1]}'
    _font = pygame.font.SysFont(pygame.font.get_default_font(), 25)
    self.surf_text = _font.render(_str, True, BLACK)
    self.rect_text = self.surf_text.get_rect()
    self.rect_text.top = self.rect_image.bottom + 10
    self.rect_text.left = self.rect_image.left + 10

  def __save_result(self):
    if self.image_cv is None or self.bouding_box.is_setted_end_pos == False and self.bouding_box.is_setted_end_pos == False:
      _dialog_msg = "No license plate cut..."
      _rect = pygame.Rect(0, 0, 400, 200)
      _rect.center = pygame.math.Vector2(SCREEN_WIDTH//2, SCREEN_HEIGHT//2)
      pygame_gui.windows.UIConfirmationDialog(rect = _rect,
          action_long_desc = _dialog_msg,
          window_title ='Warning!',
          manager = self.ui_manager)
      return
    
    create_annotation_xml(
      self.image_path.split(".")[0],
      self.image_cv.shape[0], self.image_cv.shape[1], self.image_cv.shape[2],
      self.bouding_box.pos_start.x-self.rect_image.left,
      self.bouding_box.pos_start.y-self.rect_image.top,
      self.bouding_box.pos_end.x-self.rect_image.left,
      self.bouding_box.pos_end.y-self.rect_image.top
    )

    _save_image = self.image_cv.copy()
    _save_image = cv.transpose(_save_image)
    _save_image = cv.cvtColor(_save_image, cv.COLOR_RGB2BGR)
    cv.imwrite(f'{DATASET_IMAGES_PATH}/{self.image_path.split(".")[0]}.jpg', _save_image)

    _dialog_msg = f'Annotation: ./annotations/{self.image_path.split(".")[0]}.xml\nImage: ./images/{self.image_path}'
    _rect = pygame.Rect(0, 0, 400, 200)
    _rect.center = pygame.math.Vector2(SCREEN_WIDTH//2, SCREEN_HEIGHT//2)
    pygame_gui.windows.UIConfirmationDialog(rect = _rect,
      action_long_desc = _dialog_msg,
      window_title ='Success!',
        manager = self.ui_manager)
    return

class Canvas:
  def __init__(self) -> None:
    pygame.init()
    pygame.display.set_caption(APP_CAPTION)
    self.clock = pygame.time.Clock()
    self.canvas = pygame.display.set_mode((
      SCREEN_WIDTH, SCREEN_HEIGHT
    ))
    self.frame = Frame(self.canvas)

  def run(self):
    _last_time = time.time()
    while True:
      _delta_time = time.time() - _last_time
      _last_time = time.time()

      for event in pygame.event.get():
        if event.type == pygame.QUIT:
          pygame.quit()
          sys.exit()
        self.frame.events(event)

      self.canvas.fill(WHITE)
      self.frame.update(_delta_time)
      self.frame.render(self.canvas)

      pygame.display.update()
      self.clock.tick(FRAME_RATE)


if __name__ == '__main__':
  app = Canvas()
  app.run()
