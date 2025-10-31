# import os
# import tensorflow as tf
# from tensorflow.keras.preprocessing import image
# import numpy as np
# import json
# import google.generativeai as genai
# from datetime import datetime

# # ✅ Use environment variable for API key
# genai.configure(api_key=os.getenv("GOOGLE_API_KEY", "AIzaSyB0v5KTpHCvMFHelEkbjXlKzLuDbjMDQUQ"))
# model_gemini = genai.GenerativeModel("gemini-2.5-flash")

# TEMP_FILE = os.path.join(os.path.dirname(__file__), "results_temp.json")


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


# def getdataresponce(url=r"D:\Hacktons\HackMan\AI\imgo.jpg"):
#     try:
#         # Check if image exists
#         if not os.path.exists(url):
#             raise FileNotFoundError(f"❌ Image not found at: {url}")
        
#         img_path = url
#         img = image.load_img(img_path, target_size=(160, 160))
#         img_array = image.img_to_array(img)
#         img_array = np.expand_dims(img_array, axis=0)
#         img_array = img_array / 255.0

#         model_path = os.path.join(os.path.dirname(__file__), "safe_model.h5")
#         if not os.path.exists(model_path):
#             raise FileNotFoundError(f"❌ Model not found at: {model_path}")

#         model = tf.keras.models.load_model(model_path, custom_objects={'Cast': CastLayer})

#         prediction = model.predict(img_array)
#         predicted_class_index = np.argmax(prediction)

#         print(f"Predicted class index: {predicted_class_index}")
#         print(f"Predicted class probability: {prediction[0][predicted_class_index]}")
#         sorted_indices = np.argsort(prediction[0])[::-1]
#         sorted_probabilities = prediction[0][sorted_indices]
#         print("Top 5 predicted classes and probabilities:")
#         for i in range(5):
#             print(f"Class {sorted_indices[i]}: {sorted_probabilities[i]:.4f}")

#         # ✅ Fixed: removed duplicate 'Pepper,_bell___healthy'
#         classes = [
#             'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust',
#             'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew',
#             'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot',
#             'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight',
#             'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
#             'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
#             'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
#             'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
#             'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
#             'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
#             'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot',
#             'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
#             'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
#             'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
#             'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
#         ]
        
#         predicted_class_index = np.argmax(prediction)
#         confidence = prediction[0][predicted_class_index]
        
#         # ✅ Added bounds checking
#         if predicted_class_index >= len(classes):
#             raise ValueError(f"Predicted class index {predicted_class_index} is out of bounds")
        
#         predicted_label = classes[predicted_class_index]
#         plant_name, disease = predicted_label.split('___')
#         print(predicted_class_index, confidence, plant_name, disease)
        
#         save_gemini_result(predicted_class_index, confidence, plant_name, disease)
        
#     except Exception as e:
#         print(f"❌ Error in getdataresponce: {e}")
#         raise


# def save_gemini_result(predicted_class_index, confidence, plant_name, disease):
#     """
#     Generates a structured Gemini JSON and appends it to temp storage.
#     """
#     prompt = f"""
#     The plant '{plant_name}' was detected with class index '{predicted_class_index}'
#     and a confidence of {confidence * 100:.2f}%. 
#     Return a valid JSON with the following structure only:

#     {{
#         "plantName": "{plant_name}",
#         "disease": "{disease}",
#         "confidence": {int(confidence * 100)},
#         "severity": "Low" | "Medium" | "High",
#         "status": "healthy" | "needs-attention" | "critical",
#         "treatment": {{
#             "immediate": ["list of immediate steps"],
#             "longTerm": ["list of long term steps"],
#             "prevention": ["list of prevention methods"]
#         }},
#         "description": "short 1-line description of the disease"
#     }}
#     Only return valid JSON — no text or explanations.
#     """

#     try:
#         response = model_gemini.generate_content(prompt)
#         print("✅ Gemini API response received.")

#         result_text = getattr(response, "text", None)
#         if not result_text:
#             try:
#                 result_text = response.candidates[0].content.parts[0].text
#             except Exception:
#                 result_text = None

#         if not result_text:
#             print("❌ Gemini response was empty or invalid.")
#             print(response)
#             return

#         result_text = result_text.strip()
#         if result_text.startswith("```"):
#             result_text = result_text.strip("`")
#             if result_text.lower().startswith("json"):
#                 result_text = result_text[4:]
#             result_text = result_text.strip()

#         print("🧩 Cleaned Gemini output:")
#         print(result_text)

#         result_json = json.loads(result_text)

#     except Exception as e:
#         print(f"⚠️ Gemini call or JSON parsing failed: {e}")
#         return

#     # Load existing data
#     data = []
#     if os.path.exists(TEMP_FILE):
#         try:
#             with open(TEMP_FILE, "r") as f:
#                 content = f.read().strip()
#                 if content:
#                     data = json.loads(content)
#                 else:
#                     print("⚠️ TEMP_FILE is empty, starting a new list.")
#         except json.JSONDecodeError as e:
#             print(f"⚠️ JSON file corrupted or invalid: {e}. Starting fresh.")
#         except Exception as e:
#             print(f"⚠️ Could not read TEMP_FILE: {e}. Starting fresh.")

#     result_json["id"] = str(len(data) + 1)
#     data.append(result_json)

#     with open(TEMP_FILE, "w") as f:
#         json.dump(data, f, indent=2)

#     print(f"✅ Gemini JSON saved for {plant_name}")


# def finalize_results():
#     """
#     Called after all images are processed.
#     Returns all results and clears the temp file.
#     """
#     if not os.path.exists(TEMP_FILE):
#         return []

#     try:
#         # ✅ Fixed: Actually load the JSON data
#         with open(TEMP_FILE, "r") as f:
#             data = json.load(f)

#         os.remove(TEMP_FILE)
#         print("✅ All results finalized and file cleared.")
        
#         # ✅ Fixed: Return the data directly, not data.json()
#         return data
        
#     except Exception as e:
#         print(f"❌ Error finalizing results: {e}")
#         return []


# # Example usage
# if __name__ == "__main__":
#     getdataresponce()
#     results = finalize_results()
#     print("Final results:", results)


import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import google.generativeai as genai
from datetime import datetime

genai.configure(api_key="")
model_gemini = genai.GenerativeModel("gemini-2.5-flash")

TEMP_FILE = os.path.join(os.path.dirname(__file__), "results_temp.json")


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

    model_path = os.path.join(os.path.dirname(__file__), "safe_model.h5")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"❌ Model not found at: {model_path}")

    model = tf.keras.models.load_model(model_path, custom_objects={'Cast': CastLayer})

    prediction = model.predict(img_array)
    predicted_class_index = np.argmax(prediction)

    # print(f"Predicted class index: {predicted_class_index}")
    # print(f"Predicted class probability: {prediction[0][predicted_class_index]}")
    sorted_indices = np.argsort(prediction[0])[::-1]
    sorted_probabilities = prediction[0][sorted_indices]
    # print("Top 5 predicted classes and probabilities:")
    # for i in range(5):
    #     print(f"Class {sorted_indices[i]}: {sorted_probabilities[i]:.4f}")


    classes = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust','Apple___healthy','Blueberry___healthy','Cherry_(including_sour)___Powdery_mildew','Cherry_(including_sour)___healthy'
               ,'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot','Corn_(maize)___Common_rust_','Corn_(maize)___Northern_Leaf_Blight','Corn_(maize)___healthy','Grape___Black_rot','Grape___Esca_(Black_Measles)','Grape___Leaf_blight_(Isariopsis_Leaf_Spot)','Grape___healthy'
               ,'Orange___Haunglongbing_(Citrus_greening)','Peach___Bacterial_spot','Peach___healthy','Pepper,_bell___Bacterial_spot','Pepper,_bell___healthy','Pepper,_bell___healthy','Potato___Early_blight','Potato___Late_blight','Potato___healthy','Raspberry___healthy','Soybean___healthy'
               ,'Squash___Powdery_mildew','Strawberry___Leaf_scorch','Strawberry___healthy','Tomato___Bacterial_spot','Tomato___Early_blight','Tomato___Late_blight','Tomato___Leaf_Mold','Tomato___Septoria_leaf_spot','Tomato___Spider_mites Two-spotted_spider_mite'
               ,'Tomato___Target_Spot','Tomato___Tomato_Yellow_Leaf_Curl_Virus','Tomato___Tomato_mosaic_virus','Tomato___healthy']
    predicted_class_index = np.argmax(prediction)
    confidence = prediction[0][predicted_class_index]
    predicted_label = classes[predicted_class_index]
    plant_name, disease = predicted_label.split('___')
    # print(predicted_class_index, confidence, plant_name, disease)
    save_gemini_result(predicted_class_index, confidence, plant_name, disease)


def save_gemini_result(predicted_class_index, confidence, plant_name,disease):
    """
    Generates a structured Gemini JSON and appends it to temp storage.
    """
    prompt = f"""
    The plant '{plant_name}' was detected with class index '{predicted_class_index}'
    and a confidence of {confidence * 100:.2f}%. 
    Return a valid JSON with the following structure only:

    {{
        plantName: '{plant_name}',
        disease: '{disease}',
        confidence: {int(confidence * 100)},
        severity: 'Low' | 'Medium' | 'High',
        status: 'healthy' | 'needs-attention' | 'critical',
        treatment: {{
            immediate: [list of immediate steps],
            longTerm: [list of long term steps],
            prevention: [list of prevention methods]
        }},
        description: 'short 1-line description of the disease'
    }}
    Only return valid JSON — no text or explanations.
    """

    response = model_gemini.generate_content(prompt)
    # print(response)
    try:
        response = model_gemini.generate_content(prompt)
        print("✅ Gemini API response received.")

        result_text = getattr(response, "text", None)
        if not result_text:
            try:
                result_text = response.candidates[0].content.parts[0].text
            except Exception:
                result_text = None

        if not result_text:
            print("❌ Gemini response was empty or invalid.")
            print(response)
            return

        result_text = result_text.strip()
        if result_text.startswith("```"):
            result_text = result_text.strip("`")
            if result_text.lower().startswith("json"):
                result_text = result_text[4:]
            result_text = result_text.strip()

        # print("🧩 Cleaned Gemini output:")
        # print(result_text)

        result_json = json.loads(result_text)

    except Exception as e:
        print(f"⚠️ Gemini call or JSON parsing failed: {e}")
        return
    data = []
    if os.path.exists(TEMP_FILE):
        try:
            with open(TEMP_FILE, "r") as f:
                content = f.read().strip()
                if content:  # not empty
                    data = json.loads(content)
                else:
                    print("⚠️ TEMP_FILE is empty, starting a new list.")
        except json.JSONDecodeError as e:
            print(f"⚠️ JSON file corrupted or invalid: {e}. Starting fresh.")
        except Exception as e:
            print(f"⚠️ Could not read TEMP_FILE: {e}. Starting fresh.")

    result_json["id"] = str(len(data) + 1)
    data.append(result_json)

    with open(TEMP_FILE, "w") as f:
        json.dump(data, f, indent=2)

    # print(f"✅ Gemini JSON saved for {plant_name}")



def finalize_results():
    """
    Called after all images are processed.
    Returns all results and clears the temp file.
    """
    if not os.path.exists(TEMP_FILE):
        return []

    with open(TEMP_FILE, "r") as f:
        data = json.load(f)


    os.remove(TEMP_FILE) 
    print("✅ All results finalized and file cleared.")
    return data[0]