"""Original Veya Core sculpture. Blender 4.5 LTS; run with -- project-root."""
import bpy, math, os, sys
from mathutils import Vector
ROOT=sys.argv[sys.argv.index('--')+1]; OUT=os.path.join(ROOT,'public/models')
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def material(name,col,metal,rough):
 m=bpy.data.materials.new(name);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*col,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough;return m
chrome=material('Polished titanium',(.72,.77,.8),1,.19)
black=material('Obsidian ceramic',(.015,.02,.025),.7,.23)
acid=material('Electric enamel',(.68,.95,.008),.5,.23)
# Machined V cross-section: deliberately broad arms and deep rounded corners.
poly=[(-2.05,1.65),(-.93,1.65),(0,-.62),(.93,1.65),(2.05,1.65),(.62,-1.88),(-.62,-1.88)]
for i in range(7):
 depth=.22 if i%2 else .36; y=(i-3)*.35;n=len(poly)
 verts=[(x,yy,z) for yy in [-depth/2,depth/2] for x,z in poly]
 faces=[tuple(range(n-1,-1,-1)),tuple(range(n,n*2))]+[(j,(j+1)%n,(j+1)%n+n,j+n) for j in range(n)]
 mesh=bpy.data.meshes.new('Precision V section');mesh.from_pydata(verts,[],faces);mesh.update();o=bpy.data.objects.new('LAYER_'+str(i),mesh);bpy.context.collection.objects.link(o);o.location.y=y
 o.data.materials.append(chrome if i%2==0 else acid if i==3 else black)
 bpy.context.view_layer.objects.active=o;o.select_set(True)
 b=o.modifiers.new('Soft machined edge','BEVEL');b.width=.105 if i%2==0 else .065;b.segments=6;bpy.ops.object.modifier_apply(modifier=b.name)
 for p in mesh.polygons:p.use_smooth=True
 b=o.modifiers.new('Precision normals','WEIGHTED_NORMAL');b.keep_sharp=True;bpy.ops.object.modifier_apply(modifier=b.name)
 o.select_set(False)
# Fine inset bars on front upper arms become part of front layer.
front=bpy.data.objects.get('LAYER_0')
for side in [-1,1]:
 for j in range(4):
  bpy.ops.mesh.primitive_cube_add(size=1,location=(side*(1.3+j*.08),-1.238,1.34));o=bpy.context.object;o.dimensions=(.025,.014,.16);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(black);o.parent=front;o.matrix_parent_inverse=front.matrix_world.inverted();o.name='ETCH_'+str(side)+'_'+str(j)
# Export with independent layers so runtime can reveal their construction.
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,'veya-core.glb'),export_format='GLB',export_apply=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True;scene.render.resolution_x=1200;scene.render.resolution_y=1200;scene.render.resolution_percentage=100;scene.render.film_transparent=True;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA'
scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.35,.4,.48,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.6
for name,loc,power,size,color in [('Key',(-4,-5,6),1500,5,(.85,.92,1)),('White strip',(4,-3,3),2200,3,(1,1,1)),('Lime rim',(2,4,4),1800,3,(.78,1,.2)),('Lowbox',(-2,-2,-4),900,3,(.7,.75,1))]:
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.shape='RECTANGLE';d.size=size;d.size_y=size*2;d.color=color;o=bpy.data.objects.new(name,d);bpy.context.collection.objects.link(o);o.location=loc;o.rotation_euler=(-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(5,-10,4));cam=bpy.context.object;cam.rotation_euler=(-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=6.1;scene.camera=cam;scene.view_settings.view_transform='AgX'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'scripts/3d/veya-core.blend'));scene.render.filepath=os.path.join(ROOT,'scripts/3d/veya-core.png');bpy.ops.render.render(write_still=True)
