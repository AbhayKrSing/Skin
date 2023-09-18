
def main():
    import tensorflow as tf
    from PIL import Image
    # from tensorflow.keras.preprocessing import image
    # from tensorflow.keras import Model
    import cv2
    import os
    import numpy as np
    # import urllib.request
    from urllib.parse import quote
    # import requests
    # import io
    from urllib.parse import unquote
    import sys;
    
    label = ['Seborrheic Keratoses and other Benign Tumors',
    'Psoriasis pictures Lichen Planus and related diseases',
    'Tinea Ringworm Candidiasis and other Fungal Infections',
    'Eczema Photos',
    'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions']

    vgg_model = tf.keras.applications.vgg19.VGG19(weights = 'imagenet',  include_top = False, input_shape = (180, 180, 3))

    def predict_skin_disease(dataImage):
        print('I m model')
    # Define list of class names
        class_names = label

        # Load saved model
        model = tf.keras.models.load_model('skin.h5')

        img = cv2.imread(dataImage)
        img = cv2.resize(img, (180, 180))
        img = np.array(img)
        img = np.expand_dims(img, axis=0)
        img = vgg_model.predict(img)
        img = img.reshape(1, -1)

        # Make prediction on preprocessed image
        pred = model.predict(img)[0]
        # print(pred)
        predicted_class_index = np.argmax(pred)
        # print(predicted_class_index)
        predicted_class_name = class_names[predicted_class_index]

        return predicted_class_name

    result=predict_skin_disease(sys.argv[1])
    file = open('myfile.txt', 'w')
    file.write(result)

if(__name__=='__main__'):
    main()