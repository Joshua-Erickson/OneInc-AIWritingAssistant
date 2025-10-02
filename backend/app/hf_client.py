import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")

def callModel(text: str):
    url = f"https://router.huggingface.co/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "messages": [
            {
                "role": "user",
                "content": f"Rewrite this text in these different styles: Professional, Casual, Polite, Social-Media, i just need it rewritten, i don't need an explanation, and dont use emojis."
                            f"Separate each style Clearly, and follow this format: "
                            f"Professional:"
                            f"(professional response)"
                            f"Casual:"
                            f"(casual response)"
                            f"Polite:"
                            f"(polite response)"
                            f"Social-Media:"
                            f"(social-media response)"
                            f"This is the text: {text}"
            }
        ],
        "model": "deepseek-ai/DeepSeek-V3-0324",
        "stream": True,
    }

    try:
        with requests.post(url, headers=headers, json=data, stream=True) as response:
            response.raise_for_status()

            for line in response.iter_lines():
                if line:
                    decoded = line.decode("utf-8").strip()

                    if decoded == "[DONE]":
                        break

                    try:
                        data = json.loads(decoded.replace("data: ", ""))
                        chunk = data["choices"][0]["delta"].get("content", "")

                        if chunk:
                            yield chunk

                    except json.JSONDecodeError:
                        continue

    except requests.exceptions.RequestException as e:
        yield json.dumps({"error": "Request failed", "details": str(e)})

        print("Status Code:", response.status_code)
        print("Raw Response:", response.text)
        print("Request URL:", response.request.url)
        print("Request Headers:", response.request.headers)
        print("Request Body:", response.request.body)

        # response.raise_for_status()
        # result = response.json()
        # generated_text = result["choices"][0]["message"]["content"]

        # print("Request Reponse:", generated_text)
        # print("Request Reponse:", results)

    #     return generated_text
    # except requests.exceptions.RequestException as e:
    #     return {"error": "Request failed", "details": str(e)}
    # except (KeyError, ValueError):
    #     return {"error": "Invalid response from model", "raw_text": response.text}