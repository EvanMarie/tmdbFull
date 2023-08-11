const t=(p,e)=>(p.profile_path||p.poster_path)&&!(e.profile_path||e.poster_path)?-1:!(p.profile_path||p.poster_path)&&(e.profile_path||e.poster_path)?1:0;export{t as p};
