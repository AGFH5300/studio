export const places = [
 {id:'services',name:'The studio',label:'What we build',path:'/services',x:-4.6,z:-2.65,height:3.1,color:'#567ea8'},
 {id:'build',name:'The workshop',label:'Build your estimate',path:'/build',x:4.55,z:-2.45,height:3.2,color:'#b26d55'},
 {id:'pricing',name:'The collection',label:'Explore packages',path:'/pricing',x:4.35,z:2.9,height:2.5,color:'#627d60'},
 {id:'about',name:'The commons',label:'Meet Veya Labs',path:'/about',x:-4.8,z:2.8,height:3.3,color:'#a17d37'},
 {id:'process',name:'The path',label:'How it comes together',path:'/process',x:0,z:-4.6,height:2.8,color:'#77709a'},
 {id:'contact',name:'The welcome desk',label:'Start a conversation',path:'/contact',x:0,z:4.8,height:2.5,color:'#517c88'},
] as const;
export type PlaceId=typeof places[number]['id'];
