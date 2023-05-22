export type User = {
	id: number
	name: string
	screen_name: string
	profile_image_url_https: string
}

export type Status = {
	created_at: string
	id_str: string
	text: string
	user?: User
	retweet_count: 6852
	favorite_count: 11435
}

export type FF = {
	ff: User[]
	fn: User[]
	nf: User[]
	nn: User[]
	all: User[]
}

export type FullUser = {
	id: number
	id_str: string
	name: string
	screen_name: string
	location: string
	description: string
	url: string
	entities: [object]
	protected: boolean
	followers_count: number
	friends_count: number
	listed_count: number
	created_at: string
	favourites_count: number
	// utc_offset: null,
	// time_zone: null,
	// geo_enabled: boolean,
	verified: boolean
	statuses_count: number
	// lang: string,
	// status: [Object],
	// contributors_enabled: boolean,
	// is_translator: boolean,
	// is_translation_enabled: boolean,
	// profile_background_color: string,
	// profile_background_image_url: string,
	// profile_background_image_url_https: string,
	// profile_background_tile: boolean,
	// profile_image_url: string,
	// profile_image_url_https: string,
	// profile_link_color: string,
	// profile_sidebar_border_color: string,
	// profile_sidebar_fill_color: string,
	// profile_text_color: string,
	// profile_use_background_image: boolean,
	// has_extended_profile: boolean,
	// default_profile: boolean,
	// default_profile_image: boolean,
	following: boolean
	// live_following: boolean,
	// follow_request_sent: boolean,
	// notifications: boolean,
	muting: boolean
	blocking: boolean
	blocked_by: boolean
	// translator_type: 'none',
}
