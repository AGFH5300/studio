from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
import tempfile,os
fontpath=os.path.join(tempfile.gettempdir(),'veya-geist.ttf');pixelpath=os.path.join(tempfile.gettempdir(),'veya-pixel.ttf')
for src,dest in [('public/fonts/geist-sans.woff2',fontpath),('public/fonts/geist-pixel.woff2',pixelpath)]:
 f=TTFont(src);f.flavor=None;f.save(dest)
im=Image.new('RGB',(1488,840),'#f3f3ee');d=ImageDraw.Draw(im)
font=lambda n:ImageFont.truetype(fontpath,n)
pixel=lambda n:ImageFont.truetype(pixelpath,n)
d.text((64,46),'YOUR BRAND',font=font(26),fill='#182032');d.text((1010,50),'About     Services     Contact',font=font(20),fill='#3c4350');d.line((64,108,1424,108),fill='#d4d8de',width=2)
d.text((64,160),'01 / BRAND EXPERIENCE',font=font(20),fill='#3055d9');d.text((64,228),'Good design.',font=font(86),fill='#172032');d.text((64,331),'Better business.',font=pixel(86),fill='#3055d9');d.text((66,470),'A clearer story. A stronger first impression.',font=font(25),fill='#535e71')
d.rounded_rectangle((64,546,330,624),radius=9,fill='#3055d9');d.text((98,567),'Let’s talk    ↗',font=font(27),fill='white');d.rounded_rectangle((1040,176,1424,644),radius=15,fill='#3055d9')
for i,t in enumerate(['MAKE','YOUR','MARK.']):d.text((1082,215+i*85),t,font=pixel(68),fill='#eef3ff')
d.text((1082,569),'VEYA LABS / CONCEPT',font=font(20),fill='#ccd9ff');d.line((64,711,1424,711),fill='#d4d8de',width=2)
for i,t in enumerate(['01   Design with purpose','02   Build for people','03   Grow with clarity']):d.text((64+i*464,757),t,font=font(24),fill='#465168')
im.save('scripts/3d/screen.png')
