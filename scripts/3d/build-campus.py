"""Original explorable Veya campus. Blender 4.5 LTS."""
import bpy, math, sys, os, random
from mathutils import Vector
ROOT=sys.argv[sys.argv.index('--')+1];OUT=os.path.join(ROOT,'public/models');random.seed(41)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def mat(name,c,metal=0,rough=.5):
 m=bpy.data.materials.new(name);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*c,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough;return m
ivory=mat('Warm porcelain',(.87,.85,.77));stone=mat('Stone',(.59,.65,.67));ground=mat('Campus paving',(.72,.77,.71));white=mat('Chalk',(.94,.94,.89));glass=mat('Smoked blue glass',(.19,.34,.4),.35,.19);blue=mat('Cornflower enamel',(.2,.42,.74));green=mat('Canopy',(.27,.49,.37));grass=mat('Garden',(.43,.61,.44));wood=mat('Ash timber',(.55,.36,.21));coral=mat('Terracotta',(.7,.3,.2));yellow=mat('Ochre',(.91,.67,.26));violet=mat('Iris',(.47,.41,.67));ink=mat('Lettering',(.16,.23,.25));water=mat('Water',(.29,.58,.65),.25,.2)
objects=[];group='CAMPUS'
def finish(o,name,m):
 o.name=name;o.data.materials.append(m);o['station']=group;objects.append(o);return o
def cube(name,loc,size,m,bevel=.06):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  b=o.modifiers.new('Soft edge','BEVEL');b.width=bevel;b.segments=3;bpy.ops.object.modifier_apply(modifier=b.name);b=o.modifiers.new('Normals','WEIGHTED_NORMAL');bpy.ops.object.modifier_apply(modifier=b.name)
 return finish(o,name,m)
def cyl(name,loc,r,depth,m,vertices=40):
 bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=r,depth=depth,location=loc);o=bpy.context.object
 b=o.modifiers.new('Edge','BEVEL');b.width=.035;b.segments=2;bpy.ops.object.modifier_apply(modifier=b.name)
 return finish(o,name,m)
def sphere(name,loc,size,m):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=10,radius=1,location=loc);o=bpy.context.object;o.scale=size
 for p in o.data.polygons:p.use_smooth=True
 return finish(o,name,m)
def beam(name,a,b,r,m):
 a,b=Vector(a),Vector(b);o=cyl(name,(a+b)/2,r,(a-b).length,m,16);o.rotation_euler=(b-a).to_track_quat('Z','Y').to_euler();return o
def text(body,loc,size,m,rot=(math.pi/2,0,0)):
 c=bpy.data.curves.new('Engraved label','FONT');c.body=body;c.size=size;c.align_x='CENTER';c.extrude=.001;o=bpy.data.objects.new('Label '+body,c);bpy.context.collection.objects.link(o);o.location=loc;o.rotation_euler=rot;bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o.select_set(False);return finish(o,'Label '+body,m)
def tree(x,y,s=1):
 cyl('Tree pot',(x,y,.28),.48*s,.42,ivory);cyl('Trunk',(x,y,.88*s),.075*s,1.15*s,wood,14);sphere('Tree crown',(x,y,1.66*s),(.62*s,.58*s,.78*s),green);sphere('Tree crown',(x+.27*s,y,1.45*s),(.4*s,.4*s,.5*s),grass)
# Rounded elevated slab: all walking stays on the inset plaza.
cube('Floating island',(0,0,-.64),(16.2,13.2,1.25),stone,.65)
cube('Island surface',(0,0,.015),(16,13,.24),ground,.55)
# Courtyard paths intersect across five buildings.
cube('East west promenade',(0,0,.155),(14.6,1.4,.07),ivory,.08)
cube('North south promenade',(0,0,.16),(1.5,11.6,.07),ivory,.08)
for x in [-6.9+i*.65 for i in range(22)]:cube('Path joint',(x,0,.199),(.018,1.4,.005),stone,.001)
# Central reflecting pool and circular meeting steps.
cyl('Courtyard rim',(0,-.35,.22),1.15,.15,white,64);cyl('Pool',(0,-.35,.31),.97,.06,water,64)
cyl('Fountain pedestal',(0,-.35,.4),.3,.18,ivory);sphere('Fountain orb',(0,-.35,.72),(.32,.32,.32),blue)
# Studio: open gallery with blue sawtooth roof and visible design boards.
group='services';x,y=-4.6,2.65
cube('Studio base',(x,y,.32),(3.5,3.0,.32),white,.12);cube('Studio back',(x,y+1.1,1.3),(3.4,.22,2),ivory);cube('Studio west',(x-1.6,y,.95),(.2,2.5,1.3),ivory)
for xx in [x-1.45,x+1.45]:cyl('Studio front column',(xx,y-1.18,1.23),.075,2.0,blue,20)
for i in range(4):
 o=cube('Studio folded roof',(x-1.38+i*.9,y,2.39),(.97,3.0,.18),blue,.025);o.rotation_euler.y=.18
cube('Studio desk',(x,y,1.0),(2.3,.75,.12),wood);beam('Desk leg',(x-.9,y,.48),(x-.9,y,.95),.045,ink);beam('Desk leg',(x+.9,y,.48),(x+.9,y,.95),.045,ink)
for i in range(3):
 cube('Display',(x-.8+i*.8,y+.13,1.36),(.65,.06,.51),glass,.025);cube('Display content',(x-.8+i*.8,y+.091,1.36),(.44,.012,.24),[coral,yellow,violet][i],.015)
text('STUDIO',(x,y-1.53,.52),.24,blue)
# Estimator: glass-roofed modular workshop with tangible building blocks.
group='build';x,y=4.55,2.45
cube('Workshop base',(x,y,.34),(3.5,3.2,.4),white,.13)
for xx in [-1.5,1.5]:
 for yy in [-1.3,1.3]:cyl('Workshop column',(x+xx,y+yy,1.35),.075,2.1,coral,16)
cube('Workshop roof',(x,y,2.49),(3.5,3.15,.17),coral,.07);cube('Workshop skylight',(x,y,2.61),(2.6,2.2,.11),glass,.07)
for xx in [-.95,0,.95]:cube('Roof mullion',(x+xx,y,2.68),(.045,2.1,.045),ivory,.01)
cube('Workshop rear',(x,y+1.33,1.24),(3.1,.13,1.65),ivory)
for i in range(5):cube('Scope module',(x-1.1+i*.5,y-.25,.7+(.18 if i%2 else 0)),(.42,.68,.38+(.35 if i%2 else 0)),[blue,coral,yellow,violet,grass][i],.07)
text('BUILD',(x,y-1.65,.48),.25,coral)
# Pricing: four discrete plinths under a light pergola.
group='pricing';x,y=4.35,-2.9
cube('Pricing terrace',(x,y,.3),(3.9,2.65,.3),ivory,.14)
for i in range(4):
 xx=x-1.26+i*.84;h=.5+i*.19;cube('Package plinth',(xx,y,.5+h/2),(.64,.78,h),[white,blue,green,violet][i],.08);text(['01','02','03','04'][i],(xx,y-.405,.48+h/2),.16,ink)
for xx in [-1.73,1.73]:beam('Pricing pergola upright',(x+xx,y+.9,.4),(x+xx,y+.9,2.1),.065,wood)
for i in range(7):cube('Pergola slat',(x-1.7+i*.56,y,2.1),(.09,2.7,.11),wood,.02)
text('PACKAGES',(x,y-1.4,.38),.22,ink)
# About: round pavilion for direct conversations, amber parasol.
group='about';x,y=-4.8,-2.8
cyl('Commons deck',(x,y,.29),1.7,.3,ivory,64);cyl('Commons table',(x,y,.99),.66,.13,white);cyl('Table support',(x,y,.65),.12,.65,wood)
for a in [0,math.pi/2,math.pi,math.pi*1.5]:
 xx=x+1.02*math.cos(a);yy=y+1.02*math.sin(a);cyl('Chair seat',(xx,yy,.61),.3,.15,blue);cyl('Chair leg',(xx,yy,.37),.08,.37,wood)
cyl('Parasol mast',(x,y,1.7),.045,2.3,wood)
bpy.ops.mesh.primitive_cone_add(vertices=40,radius1=1.75,radius2=.12,depth=.53,location=(x,y,2.63));finish(bpy.context.object,'Parasol',yellow)
text('THE COMMONS',(x,y-1.8,.44),.21,ink)
# Process trail: stepped platforms and beacon.
group='process';x,y=0,4.6
for i in range(5):cube('Process stepping stone',(x-1.3+i*.65,y,.27+i*.09),(.55,.9,.2+i*.12),[white,white,blue,white,white][i],.08)
beam('Signal mast',(1.35,y,.5),(1.35,y,2.3),.035,ink);cube('Process banner',(1.72,y,2.11),(.7,.045,.4),blue,.025)
text('THE PATH',(0,y-.7,.43),.18,ink)
# Contact: small welcome desk at front edge.
group='contact';x,y=0,-4.8
cube('Hello platform',(x,y,.28),(2.65,1.5,.28),white,.15);cube('Hello desk',(x,y,.8),(1.95,.6,.86),blue,.13);text('HELLO',(x,y-.315,.91),.25,white)
for xx in [-1.2,1.2]:beam('Desk canopy post',(x+xx,y+.45,.4),(x+xx,y+.45,1.9),.045,ink)
cube('Hello canopy',(x,y,1.96),(2.8,1.5,.12),white,.1)
# Landscaping, benches and warm light fixtures.
group='CAMPUS'
for x,y,s in [(-6.6,4.7,.85),(-2.3,4.7,.75),(6.6,4.8,.9),(-6.7,-4.8,.8),(6.4,-4.75,.9),(-2.2,-4.8,.6),(2.15,4.95,.6),(-6.6,.1,.65),(6.7,-.25,.65)]:tree(x,y,s)
for x,y in [(-2.6,.3),(2.6,-.25),(-1.3,2.4),(1.35,-2.6)]:
 cube('Timber bench',(x,y,.53),(1.1,.35,.12),wood,.03)
 for xx in [-.38,.38]:cube('Bench leg',(x+xx,y,.32),(.08,.28,.35),ink,.02)
for x,y in [(-7,-2),(7,1),(-2.1,-5.7),(2.1,5.7)]:
 cyl('Lamp pole',(x,y,.85),.035,1.4,ink,12);sphere('Lamp globe',(x,y,1.59),(.14,.14,.14),white)
# Small explorer: an original stylised character kept as an independent group.
group='EXPLORER';root=bpy.data.objects.new('EXPLORER',None);bpy.context.collection.objects.link(root)
player=[]
for name,loc,size,m in [('Explorer body',(0,0,.45),(.17,.13,.22),coral),('Explorer head',(0,0,.79),(.145,.14,.145),ivory),('Explorer backpack',(0,.15,.48),(.14,.06,.15),blue),('Explorer foot L',(-.085,-.03,.2),(.075,.15,.075),ink),('Explorer foot R',(.085,-.03,.2),(.075,.15,.075),ink)]:player.append(sphere(name,loc,size,m))
for o in player:o.parent=root
# Batch each station by material to keep the renderer light while retaining click targets.
for station in ['CAMPUS','services','build','pricing','about','process','contact']:
 for material in list(bpy.data.materials):
  selected=[o for o in objects if o.get('station')==station and o.data.materials[0]==material]
  if not selected:continue
  bpy.ops.object.select_all(action='DESELECT')
  for o in selected:o.select_set(True)
  bpy.context.view_layer.objects.active=selected[0];bpy.ops.object.join();selected[0].name=station+'__'+material.name.replace(' ','_')
  objects=[o for o in objects if o not in selected]+[selected[0]]
# World coordinates: Blender (x,y,z) become runtime (x,z,-y).
bpy.ops.object.select_all(action='SELECT');bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,'veya-campus.glb'),export_format='GLB',export_apply=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6)
# Honest fallback render of the complete navigable campus.
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True;scene.render.resolution_x=1600;scene.render.resolution_y=1100;scene.render.resolution_percentage=100;scene.render.film_transparent=True;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA';scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.68,.77,.88,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.65
for name,loc,power,size,col in [('Sun',(-7,-8,16),2300,8,(1,.91,.78)),('Fill',(5,-2,11),1300,9,(.72,.85,1))]:
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.size=size;d.color=col;o=bpy.data.objects.new(name,d);bpy.context.collection.objects.link(o);o.location=loc;o.rotation_euler=(-o.location).to_track_quat('-Z','Y').to_euler()
root.location=(0,-2,.21)
bpy.ops.object.camera_add(location=(17,-23,23));c=bpy.context.object;c.rotation_euler=(Vector((0,0,.4))-c.location).to_track_quat('-Z','Y').to_euler();c.data.type='ORTHO';c.data.ortho_scale=23;scene.camera=c;scene.view_settings.view_transform='AgX';scene.render.filepath=os.path.join(ROOT,'scripts/3d/veya-campus.png');bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'scripts/3d/veya-campus.blend'));bpy.ops.render.render(write_still=True)
