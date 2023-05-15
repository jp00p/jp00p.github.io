import openai
import tkinter as tk
from tkinter import ttk


# Replace YOUR_API_KEY with your actual API key
openai.api_key = "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"

# Define the OpenAI API parameters
model_engine = "text-davinci-003"
temperature = 0.5
max_tokens = 420


# Define a function to generate the response
def generate_response():
    # Get the prompt from the text box
    prompt = prompt_box.get("1.0", "end-1c")
    prompt_seed = f"Ruby Receptionists basically provide virtual receptionists for when it doesn't make sense to have a real receptionist in the office. The virtual receptionists do everything a real receptionist would, and more. We cater to any industry that needs receptionist services.  Please create 3 comedic, short, and unique marketing slogans or taglines we could use to market to the {prompt} industry.  Make sure they are funny, you can use puns or even ribald humor."

    # Call the OpenAI API to generate text based on the prompt
    response = openai.Completion.create(
        engine=model_engine,
        prompt=prompt_seed,
        temperature=temperature,
        max_tokens=max_tokens,
    )

    # Extract the generated text from the OpenAI API response
    generated_text = response.choices[0].text.strip()

    # Insert the generated text into the response box
    response_box.delete("1.0", tk.END)
    response_box.insert("1.0", generated_text)


# Create the GUI window
window = tk.Tk()
window.title("RUBY TAGLINE GENERATOR")

# Set the custom font
font_style = ttk.Style()
font_style.configure("CustomFont.TLabel", font=("Helvetica", 14))

# Set the color scheme
color_style = ttk.Style()
color_style.theme_use()
color_style.configure("CustomColor.TLabel", foreground="white", background="#7F2062")

# Create the prompt box
prompt_label = ttk.Label(
    window,
    text="Enter an industry (real estate, healthcare, etc)",
    style="CustomFont.TLabel",
)
prompt_label.pack(pady=(10, 10), padx=(10, 10))
prompt_box = tk.Text(window, height=1, width=25, font=("Helvetica", 16))
prompt_box.pack()

generate_button = ttk.Button(
    window,
    text="Generate Response",
    command=generate_response,
    style="CustomColor.TLabel",
    padding=(10, 5),
    compound="center",
)
generate_button.pack(pady=10)

# Create the response box
response_label = ttk.Label(window, text="Your taglines", style="CustomFont.TLabel")
response_label.pack(pady=(10, 10), padx=(10, 10))
response_box = tk.Text(window, height=5, width=50, font=("Helvetica", 14))
response_box.pack()

# Start the GUI event loop
window.mainloop()
