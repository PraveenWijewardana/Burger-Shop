let burgers = await fetch(burgers.json).then(res => res.json());

console.log(burgers);