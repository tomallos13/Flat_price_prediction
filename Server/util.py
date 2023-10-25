import pickle
import json
import numpy as np

__streets = None
__data_columns = None
__model = None

def get_estimated_price(street,sqr,rooms,floor, terrace):
    try:
        loc_index = __data_columns.index(street.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqr
    x[1] = rooms
    x[2] = floor
    x[3] = terrace
    if loc_index>=0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __streets

    with open("./columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __streets = __data_columns[4:]  # first 4 columns are sqr, rooms, floor, terrace

    global __model
    if __model is None:
        with open('Prediction.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_street_names():
    return __streets

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()