import pandas as pd
import joblib
import numpy as np

MODEL_PATH = "module_cali_house/models/forest_reg_model.pkl"
X_TEST_PATH = "module_cali_house/assets/x_test.csv"
Y_TEST_PATH = "module_cali_house/assets/y_test.csv"

forest_reg = joblib.load(MODEL_PATH)
column_names = [
  'longitude','latitude','housing_median_age','total_rooms',
  'total_bedrooms','population','households','median_income',
  'rooms_per_household','population_per_household',
  'bedrooms_per_room','ocean_proximity_1', 
  'ocean_proximity_2', 'ocean_proximity_3', 
  'ocean_proximity_4', 'ocean_proximity_5'
]
x_test = pd.read_csv(X_TEST_PATH, header = None, names=column_names)
y_test = pd.read_csv(Y_TEST_PATH, header = None)
y_test = y_test.to_numpy()
N = len(x_test)

def get_data():
  global x_test
  return x_test

def get_rand_predict():
  global x_test
  global y_test
  global N

  index = np.random.randint(0,N-1,5)
  some_data = x_test.iloc[index]

  y_test_result = []
  for i in index:
      s = y_test[i,0]
      y_test_result.append(s)

  array_some_data = some_data.copy().to_numpy()

  y_pred_result = []
  y_pred = forest_reg.predict(array_some_data)
  for i in range(0, 5):
    s = y_pred[i]
    y_pred_result.append(s)

  return {
    "data": some_data,
    "y_test": y_test_result,
    "y_pred": y_pred_result
  }