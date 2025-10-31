# import tensorflow as tf
# from tensorflow.keras.preprocessing import image
# import numpy as np

# class CastLayer(tf.keras.layers.Layer):
#     def __init__(self, dtype=None, **kwargs):
#         super(CastLayer, self).__init__(**kwargs)
#         self._dtype = dtype

#     def build(self, input_shape):
#         if self._dtype is None:
#             self._dtype = tf.keras.backend.floatx()
#         super(CastLayer, self).build(input_shape)

#     def call(self, inputs):
#         return tf.cast(inputs, self._dtype)
# def getdataresponce():
#     # img_path = url
#     img_path = r'C:\Users\neera\Downloads\imgo.jpg'
#     img = image.load_img(img_path, target_size=(160, 160))
#     img_array = image.img_to_array(img) 
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = img_array / 255.0 

#     model = tf.keras.models.load_model('safe_model.h5', custom_objects={'Cast': CastLayer})

#     prediction = model.predict(img_array)

#     predicted_class_index = np.argmax(prediction)

#     print(f"Predicted class index: {predicted_class_index}")
#     print(f"Predicted class probability: {prediction[0][predicted_class_index]}")
#     sorted_indices = np.argsort(prediction[0])[::-1]
#     sorted_probabilities = prediction[0][sorted_indices]
#     print("Top 5 predicted classes and probabilities:")
#     for i in range(5):
#         print(f"Class {sorted_indices[i]}: {sorted_probabilities[i]:.4f}")



import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

class CastLayer(tf.keras.layers.Layer):
    def __init__(self, dtype=None, **kwargs):
        super(CastLayer, self).__init__(**kwargs)
        self._dtype = dtype

    def build(self, input_shape):
        if self._dtype is None:
            self._dtype = tf.keras.backend.floatx()
        super(CastLayer, self).build(input_shape)

    def call(self, inputs):
        return tf.cast(inputs, self._dtype)

def getdataresponce(url):
    img_path = url
    img = image.load_img(img_path, target_size=(160, 160))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    # ✅ Safe, dynamic model path
    model_path = os.path.join(os.path.dirname(__file__), "safe_model.h5")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"❌ Model not found at: {model_path}")

    model = tf.keras.models.load_model(model_path, custom_objects={'Cast': CastLayer})

    prediction = model.predict(img_array)
    predicted_class_index = np.argmax(prediction)

    print(f"Predicted class index: {predicted_class_index}")
    print(f"Predicted class probability: {prediction[0][predicted_class_index]}")
    sorted_indices = np.argsort(prediction[0])[::-1]
    sorted_probabilities = prediction[0][sorted_indices]
    print("Top 5 predicted classes and probabilities:")
    for i in range(5):
        print(f"Class {sorted_indices[i]}: {sorted_probabilities[i]:.4f}")
