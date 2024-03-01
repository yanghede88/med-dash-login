import pandas as pd
import sys

cal_path = './src/vital_csvs/calories_active.csv'
dist_path = './src/vital_csvs/distance.csv'
heart_path = './src/vital_csvs/heartrate.csv'
steps_path = './src/vital_csvs/steps.csv'

analysis_paths = [cal_path,dist_path,heart_path,steps_path]
analysis_path_names = ['cal','dist','heart','steps']
def process_data(kind):
    if kind == 'analysis':
        for i in enumerate(analysis_paths):
            path = analysis_paths[i[0]]
            print(path)
            if analysis_path_names[i[0]] == 'heart':
                df = pd.read_csv(path)
                df.drop(columns=['id','timezone_offset','type'],inplace=True)
                df['timestamp'] = pd.to_datetime(df['timestamp'].str.split("+").str[0])
                df.sort_values('timestamp')
                filename = f'src/vital_csvs/analysis_{analysis_path_names[i[0]]}.csv'
                df.to_csv(filename,index=False)
                continue
            
            df = pd.read_csv(path)
            df.drop(columns=['id','timezone_offset','type'],inplace=True)
            df['timestamp'] = pd.to_datetime(df['timestamp'].str.split("+").str[0])
            df['start'] = pd.to_datetime(df['start'].str.split("+").str[0])
            df['end'] = pd.to_datetime(df['end'].str.split("+").str[0])
            df.sort_values('timestamp')
            filename = f'src/vital_csvs/analysis_{analysis_path_names[i[0]]}.csv'
            df.to_csv(filename,index=False)
            
        return


def main():
    process_data(sys.argv[1])
    
if __name__ == "__main__":
    main()