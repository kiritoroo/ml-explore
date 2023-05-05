import pygame
import pygame_gui
import time
import sys

APP_CAPTION = 'License Plate: Data creator'
SCREEN_WIDTH = 1200
SCREEN_HEIGHT = 800
FRAME_RATE = 120

WHITE = pygame.Color(255, 255, 255)
BLACK = pygame.Color(50, 50, 50)

class PlusLine:
  def __init__(self) -> None:
    self.pos_start_line_vez = pygame.math.Vector2(SCREEN_WIDTH/2, 0)
    self.pos_end_line_vez = pygame.math.Vector2(SCREEN_WIDTH/2, SCREEN_HEIGHT)
    self.pos_start_line_hoz = pygame.math.Vector2(0, SCREEN_HEIGHT/2)
    self.pos_end_line_hoz = pygame.math.Vector2(SCREEN_WIDTH, SCREEN_HEIGHT/2)
    self.color = BLACK
    self.thickness = 1
    self.__config_ui_elements()

  def __config_ui_elements(self) -> None:
    self.ui_manager = pygame_gui.UIManager((SCREEN_WIDTH, SCREEN_HEIGHT))

    _rect = pygame.Rect(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 100, 20)
    self.ui_label_mouse_pos = pygame_gui.elements.UILabel(
      text="(0,0)",
      relative_rect=_rect,
      manager=self.ui_manager,
    )

  def draw(self, surface: pygame.Surface) -> None:
    pygame.draw.line( surface, self.color,self.pos_start_line_vez, self.pos_end_line_vez, self.thickness)
    pygame.draw.line( surface, self.color, self.pos_start_line_hoz, self.pos_end_line_hoz, self.thickness)
    self.ui_manager.draw_ui(surface)

  def update(self, delta_time) -> None:
    self.ui_manager.update(delta_time)
    _mouse_pos = pygame.mouse.get_pos()
    self.pos_start_line_vez.x = _mouse_pos[0]
    self.pos_end_line_vez.x = _mouse_pos[0]
    self.pos_start_line_hoz.y = _mouse_pos[1]
    self.pos_end_line_hoz.y = _mouse_pos[1]
    self.ui_label_mouse_pos.set_text(f'({_mouse_pos[0]}, {_mouse_pos[1]})')
    self.ui_label_mouse_pos.set_position(pygame.math.Vector2(_mouse_pos[0], _mouse_pos[1]))

class Frame:
  def __init__(self, surface: pygame.Surface) -> None:
    self.surface = surface
    self.plus_line = PlusLine()

  def events(self, event: pygame.event.Event) -> None:
    pass

  def render(self, surface: pygame.Surface) -> None:
    self.plus_line.draw(self.surface)

  def update(self, delta_time: float) -> None:
    self.plus_line.update(delta_time)

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
