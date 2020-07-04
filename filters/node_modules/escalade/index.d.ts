declare module 'escalade' {
	type Promisable<T> = T | Promise<T>;
	export type Callback = (directory: string, files: stirng[]) => Promisable<string | false | void>;
	function escalade(directory: string, callback: Callback): Promise<string | void>;
	export = escalade;
}

declare module 'escalade/sync' {
	export type Callback = (directory: string, files: stirng[]) => string | false | void;
	function escalade(directory: string, callback: Callback): string | void;
	export = escalade;
}
