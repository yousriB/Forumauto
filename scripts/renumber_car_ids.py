import json
import os

def renumber_car_ids():
    # Path to the cars.json file (using absolute path)
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_file_path = os.path.join(base_dir, 'data', 'cars.json')
    
    # Read the JSON file
    with open(json_file_path, 'r', encoding='utf-8') as file:
        cars_data = json.load(file)
    
    # Renumber the IDs starting from 0
    for index, car in enumerate(cars_data):
        car['id'] = index
    
    # Write the updated data back to the file
    with open(json_file_path, 'w', encoding='utf-8') as file:
        json.dump(cars_data, file, indent=2, ensure_ascii=False)
    
    print(f"Successfully renumbered {len(cars_data)} car IDs starting from 0.")

if __name__ == "__main__":
    renumber_car_ids()
