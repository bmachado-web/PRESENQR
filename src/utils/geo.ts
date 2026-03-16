export function calcDist(lat1:number,lon1:number,lat2:number,lon2:number):number{
  const R=6371000,dL=(lat2-lat1)*Math.PI/180,dl=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dL/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dl/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
export const hoy=()=>new Date().toISOString().split('T')[0];
export const horaStr=()=>new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});
```