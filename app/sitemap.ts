import type { MetadataRoute } from "next";
const base="https://studio-ae-prototype.anvamarinedmc.chatgpt.site";
export default function sitemap():MetadataRoute.Sitemap{return ["","/work","/services","/pricing","/build","/process","/about","/contact","/website-check","/privacy"].map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:((path==="/contact"||path==="/build")?0.9:0.7)}))}
