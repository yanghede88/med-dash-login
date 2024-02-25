import pandas as pd


vital_student_auth_key = ""
dalila_id = ""

from vital.client import Vital
from vital.environment import VitalEnvironment
client = Vital(
  api_key=vital_student_auth_key,
  environment=VitalEnvironment.SANDBOX
)

data = client.providers.get_all()

## show ProviderDetailed
functions = ['blood_oxygen', 'blood_pressure', 'caffeine', 'cholesterol', 'glucose', 'heartrate',
             'hrv', 'hypnogram', 'igg', 'ige', 'mindfulness_minutes', 'respiratory_rate', 'water',
             'calories_active', 'calories_basal', 'distance', 'floors_climbed', 'steps']
a = 0
data = {}
for func in functions:
    client = Vital(
    api_key=vital_student_auth_key,
    environment=VitalEnvironment.SANDBOX
  )
    method = getattr(client.vitals, func)
    function_data = method(
        user_id=dalila_id,
        start_date="2023-11-10",
        end_date = '2023-11-17'

    )
    if (len(function_data)!=0):
      print(func)
      print(type(function_data))
      data[func]=function_data

data


## save data into seperate csv files
for i in data:
  final_data = pd.DataFrame()
  for j in range(len(data[i])):
    final_data = pd.concat([final_data, pd.DataFrame([vars(data[i][j])])], ignore_index=True)
  filename = f'src/vital_csvs/dataframe_{i}.csv'  # Unique filename for each DataFrame #change back to dataframe_{i}.csv
  final_data.to_csv(filename, index=False)
  # print(final_data)
