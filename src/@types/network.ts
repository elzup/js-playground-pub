/* eslint-disable @typescript-eslint/naming-convention */
declare module 'network' {
	type Network = { mac_address: string }

	export function get_active_interface(
		cb: (err: Error, obj: Network) => void
	): void
}
