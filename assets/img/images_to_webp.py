# libwebp-1.2.1-windows-x64.zip  
# download the above file from 
# https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html

# add the bin file in system path
# run this file in the folder with all images

# cwebp -q 50 -m 6 -af -f 50 -sharpness 0 -mt -v -progress source_img.webp -o converted.webp

import os

def convert_all_images_to_webp():
    ol=[]
    for filename in os.listdir("./"):
        if filename.endswith(".jpg") or filename.endswith(".png") and filename not in ["me.png"]:
            # os.system(f"cwebp -q 50 -m 6 -af -f 50 -sharpness 0 -mt -v -progress {filename} -o {filename[:-4]}.webp")
            os.system(f"cwebp -preset photo -q 40 {filename} -o {filename[:-4]}.webp")
            ol.append(filename)
    print(ol)
        
def delete_all_webp():
    for filename in os.listdir("./"):
        if filename.endswith(".webp"):
            os.remove(filename)
convert_all_images_to_webp()
# delete_all_webp()