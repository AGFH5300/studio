"""Create Veya / 01: original interactive design instrument and its poster.
Run: blender --background --python scripts/3d/build-workstation.py -- <project-root>
"""
import bpy, math, os, sys
from mathutils import Vector
ROOT=sys.argv[sys.argv.index('--')+1] if '--' in sys.argv else os.getcwd()
OUT=os.path.join(ROOT,'public','models');os.makedirs(OUT,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
model=[]

def mat(name,color,metal=0,rough=.35,emission=0):
 m=bpy.data.materials.new(name);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 if emission:p.inputs['Emission Color'].default_value=(*color,1);p.inputs['Emission Strength'].default_value=emission
 return m
ceramic=mat('Porcelain alloy',(.73,.77,.83),.52,.27)
edge=mat('Brushed titanium',(.31,.36,.44),.92,.23)
dark=mat('Graphite polymer',(.024,.033,.05),.28,.28)
black=mat('Optical black',(.006,.009,.016),.25,.16)
blue=mat('Cobalt anodised',(.024,.07,.72),.52,.24)
white=mat('Ceramic keycaps',(.85,.88,.94),.08,.3)
ink=mat('Etched legends',(.09,.13,.21),.1,.45)
led=mat('Signal blue',(.08,.25,1),.25,.19,3)
labelwhite=mat('Light legends',(.77,.85,1),.08,.35)

def finish(obj,name,material):
 obj.name=name;obj.data.materials.append(material);model.append(obj)
 return obj

def cube(name,loc,scale,material,bevel=.05):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.dimensions=scale;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  m=o.modifiers.new('Precision radii','BEVEL');m.width=bevel;m.segments=4
  bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=m.name)
  for p in o.data.polygons:p.use_smooth=True
  m=o.modifiers.new('Weighted corner normals','WEIGHTED_NORMAL');m.keep_sharp=True;bpy.ops.object.modifier_apply(modifier=m.name)
 return finish(o,name,material)

def cylinder(name,loc,radius,depth,material,vertices=48,rot=None):
 bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,location=loc,rotation=rot or (0,0,0));o=bpy.context.object
 b=o.modifiers.new('Edge break','BEVEL');b.width=.018;b.segments=3;bpy.ops.object.modifier_apply(modifier=b.name)
 for p in o.data.polygons:p.use_smooth=True
 b=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');bpy.ops.object.modifier_apply(modifier=b.name)
 return finish(o,name,material)

def text(name,body,loc,size,material,rotation=(math.pi/2,0,0),align='LEFT'):
 curve=bpy.data.curves.new(name,'FONT');curve.body=body;curve.size=size;curve.align_x=align;curve.extrude=.0004;curve.resolution_u=3
 obj=bpy.data.objects.new(name,curve);bpy.context.collection.objects.link(obj);obj.location=loc;obj.rotation_euler=rotation
 bpy.context.view_layer.objects.active=obj;obj.select_set(True);bpy.ops.object.convert(target='MESH');obj.select_set(False)
 return finish(obj,name,material)

# Asymmetric desktop instrument: raised display, tactile deck, physical seams.
cube('Foot chassis',(0,-.2,.18),(4.3,2.55,.3),dark,.15)
cube('Deck perimeter',(0,-.2,.35),(4.34,2.57,.18),edge,.12)
cube('Control deck',(0,-.2,.48),(4.3,2.52,.22),ceramic,.12)
for x in [-1.8,1.8]:
 for y in [-1.17,.7]:cylinder('Damped foot',(x,y,.035),.16,.05,dark)
cube('Stand neck',(0,.59,1.02),(1.3,.5,1.05),edge,.11)
cube('Stand inset',(0,.305,.98),(.94,.065,.72),dark,.03)
for z in [.76,.88,1,1.12]:cube('Neck cooling line',(0,.264,z),(.78,.025,.026),black,.01)
# Display shell has a deep back and a fine front lip.
cube('Display rear',(0,.34,2.31),(4.35,.65,2.85),dark,.2)
cube('Rear satin cap',(0,.56,2.31),(4.16,.3,2.62),ceramic,.18)
cube('Display bright rim',(0,-.005,2.31),(4.38,.14,2.89),edge,.17)
cube('Display face',(0,-.09,2.31),(4.3,.15,2.81),ceramic,.14)
cube('Glass gasket',(0,-.177,2.41),(3.99,.045,2.39),dark,.13)
cube('Screen glass',(0,-.205,2.41),(3.88,.028,2.28),black,.1)
# Flat UV surface permits a live website canvas in Three.js.
w,h=3.72,2.1;z=2.43;y=-.224
mesh=bpy.data.meshes.new('Live display mesh');mesh.from_pydata([(-w/2,y,z-h/2),(w/2,y,z-h/2),(w/2,y,z+h/2),(-w/2,y,z+h/2)],[],[(0,1,2,3)]);mesh.update()
o=bpy.data.objects.new('LIVE_SCREEN',mesh);bpy.context.collection.objects.link(o)
uv=mesh.uv_layers.new(name='UVMap')
for loop,coord in zip(uv.data,[(0,0),(1,0),(1,1),(0,1)]):loop.uv=coord
screenmat=mat('Live display',(.035,.055,.1),0,.42,.3)
# Optional raster UI texture for Blender's poster and initial GLB state.
texpath=os.path.join(ROOT,'scripts','3d','screen.png')
if os.path.exists(texpath):
 n=screenmat.node_tree.nodes.new('ShaderNodeTexImage');n.image=bpy.data.images.load(texpath);n.image.pack();p=screenmat.node_tree.nodes.get('Principled BSDF');screenmat.node_tree.links.new(n.outputs['Color'],p.inputs['Base Color']);screenmat.node_tree.links.new(n.outputs['Color'],p.inputs['Emission Color']);p.inputs['Emission Strength'].default_value=.55
finish(o,'LIVE_SCREEN',screenmat)
text('Maker mark','V E Y A  /  0 1',(-1.84,-.173,1.055),.11,ink)
text('Serial label','DESIGN INSTRUMENT',(1.86,-.173,1.065),.055,ink,align='RIGHT')
cylinder('Power jewel',(1.87,-.176,3.64),.022,.008,led,24,(math.pi/2,0,0))
# Engraved screws, deck ventilation and screen cooling fins.
for x in [-2.02,2.02]:
 for z in [1.12,3.5]:
  cylinder('Flush fastener',(x,-.173,z),.035,.008,edge,24,(math.pi/2,0,0))
  cube('Fastener slot',(x,-.18,z),(.032,.004,.006),dark,.001)
for x in [-1.66+i*.145 for i in range(24)]:cube('Rear cooling slots',(x,.735,2.15),(.055,.014,.7),dark,.022)
for x in [-1.89+i*.13 for i in range(9)]:cube('Deck speaker slot',(x,.33,.599),(.038,.42,.008),dark,.015)
# Three independent control keys, raycast by name.
key_x=[-1.55,-.66,.23]
for i,(x,name) in enumerate(zip(key_x,['BRAND','BOOK','SHOP'])):
 cube('Key recess '+name,(x,-.62,.604),(.78,.74,.018),black,.08)
 k=cube('KEY_'+name,(x,-.62,.71),(.68,.64,.19),blue if i==0 else white,.065)
 text('LEGEND_'+name,name,(x,-.73,.814),.105,labelwhite if i==0 else ink,(0,0,0),'CENTER')
 text('LEGEND_NUMBER_'+name,'0'+str(i+1),(x,-.53,.814),.08,labelwhite if i==0 else ink,(0,0,0),'CENTER')
# Knurled titanium rotary encoder, inset sapphire indicator.
cylinder('Dial black collar',(1.27,-.56,.635),.5,.085,dark,64)
cylinder('DIAL',(1.27,-.56,.78),.435,.24,edge,64)
cylinder('Dial face',(1.27,-.56,.915),.378,.025,ceramic,64)
for i in range(48):
 a=2*math.pi*i/48
 o=cube('Dial knurl',(1.27+.431*math.cos(a),-.56+.431*math.sin(a),.78),(.027,.025,.16),edge,.008);o.rotation_euler.z=a
cube('Dial indicator',(1.27,-.82,.938),(.035,.13,.012),blue,.012)
text('Dial legend','ACCENT',(1.27,-1.17,.596),.073,ink,(0,0,0),'CENTER')
# Small information strip and purposeful status light.
cube('Readout frame',(-.45,-1.21,.608),(2.89,.25,.025),dark,.035)
text('Readout','CUSTOM MADE.  HUMAN LED.',(-1.76,-1.265,.629),.066,labelwhite,(0,0,0))
for i in range(3):cylinder('Status diode',(1.88,-.87+i*.11,.608),.023,.016,led,20)
# Port sockets and mechanical casing details visible from the three-quarter view.
for z in [.22,.33]:cube('Side seam',(2.166,-.28,z),(.01,1.4,.016),black,.005)
for yy in [-.72,-.38]:cube('USB port',(2.18,yy,.48),(.015,.24,.082),dark,.025)
# Hierarchy and mesh batching: retain only movable controls and live screen.
bpy.ops.object.select_all(action='DESELECT')
for obj in model:
 if obj.type=='MESH' and not obj.name.startswith(('KEY_','DIAL','LIVE_SCREEN','LEGEND_')):
  pass
# Join static geometry by material, retaining precision with a small draw-call budget.
static=[o for o in model if not o.name.startswith(('KEY_','DIAL','LIVE_SCREEN','LEGEND_'))]
for material in list(bpy.data.materials):
 group=[o for o in static if o.data.materials and o.data.materials[0]==material]
 if not group:continue
 static=[o for o in static if o not in group]
 bpy.ops.object.select_all(action='DESELECT')
 for o in group:o.select_set(True)
 bpy.context.view_layer.objects.active=group[0];bpy.ops.object.join();group[0].name='BODY_'+material.name.replace(' ','_')
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']
root=bpy.data.objects.new('VEYA_01',None);bpy.context.collection.objects.link(root)
for obj in objects:obj.parent=root
# Export the reusable source and lightweight GLB before adding studio lights.
bpy.ops.object.select_all(action='DESELECT')
for obj in objects+[root]:obj.select_set(True)
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,'veya-01.glb'),export_format='GLB',use_selection=True,export_apply=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6)
# Render an honest poster using the same model, not a separate illustration.
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True;scene.render.resolution_x=1100;scene.render.resolution_y=1100;scene.render.resolution_percentage=100
scene.render.film_transparent=True;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA'
scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.42,.48,.6,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.55

def area(name,loc,power,size,color,target=(0,0,1.7)):
 data=bpy.data.lights.new(name,'AREA');data.energy=power;data.shape='DISK';data.size=size;data.color=color;o=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
area('Large softbox',(-4,-5,8),1000,5,(.83,.9,1));area('Rim strip',(4,3,6),1300,4,(.65,.76,1));area('Front bounce',(2,-5,3),450,3,(1,.94,.85))
bpy.ops.object.camera_add(location=(6.3,-10.7,6.7));camera=bpy.context.object;camera.rotation_euler=(Vector((0,-.05,1.7))-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.type='ORTHO';camera.data.ortho_scale=6.7;scene.camera=camera
scene.view_settings.view_transform='AgX'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'scripts','3d','veya-01.blend'))
scene.render.filepath=os.path.join(ROOT,'scripts','3d','veya-01-poster.png');bpy.ops.render.render(write_still=True)
print('VEYA_MODEL_COMPLETE')
