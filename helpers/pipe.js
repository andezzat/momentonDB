const pipe = (...fns) => x => fns.reduce((res, fn) => fn(res), x);

export default pipe;
