import debug from 'debug';
debug.enable(process.env.DEBUG || 'app/*');
export { debug };
