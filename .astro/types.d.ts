declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2012/2012-01-31-hello-world.md": {
	id: "2012/2012-01-31-hello-world.md";
  slug: "hello-world";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-06-06-the-IT-crowd.md": {
	id: "2012/2012-06-06-the-IT-crowd.md";
  slug: "the-it-crowd";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-09-09-orchard-harvest-2012-keynote.md": {
	id: "2012/2012-09-09-orchard-harvest-2012-keynote.md";
  slug: "orchard-harvest-2012-keynote";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-09-15-orchard-harvest-2012-sessions-the-future-of-orchard.md": {
	id: "2012/2012-09-15-orchard-harvest-2012-sessions-the-future-of-orchard.md";
  slug: "orchard-harvest-2012-sessions-the-future-of-orchard";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-09-16-orchard-harvest-2012-sessions-ecommerce.md": {
	id: "2012/2012-09-16-orchard-harvest-2012-sessions-ecommerce.md";
  slug: "orchard-harvest-2012-sessions-ecommerce";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-09-17-orchard-harvest-2012-sessions-day-1.md": {
	id: "2012/2012-09-17-orchard-harvest-2012-sessions-day-1.md";
  slug: "orchard-harvest-2012-sessions-day-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-09-18-orchard-harvest-2012-managing-a-community.md": {
	id: "2012/2012-09-18-orchard-harvest-2012-managing-a-community.md";
  slug: "orchard-harvest-2012-managing-a-community";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-09-19-orchard-harvest-2012-theming.md": {
	id: "2012/2012-09-19-orchard-harvest-2012-theming.md";
  slug: "orchard-harvest-2012-theming";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-09-21-orchard-harvest-2012-performance.md": {
	id: "2012/2012-09-21-orchard-harvest-2012-performance.md";
  slug: "orchard-harvest-2012-performance";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012/2012-09-26-orchard-harvest-2012-sessions-day-2.md": {
	id: "2012/2012-09-26-orchard-harvest-2012-sessions-day-2.md";
  slug: "orchard-harvest-2012-sessions-day-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013/2013-01-31-rtfm.md": {
	id: "2013/2013-01-31-rtfm.md";
  slug: "rtfm";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013/2013-06-06-les-trois-filtres-de-socrate.md": {
	id: "2013/2013-06-06-les-trois-filtres-de-socrate.md";
  slug: "les-trois-filtres-de-socrate";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013/2013-06-18-orchard-harvest-2013-jour-1.md": {
	id: "2013/2013-06-18-orchard-harvest-2013-jour-1.md";
  slug: "orchard-harvest-2013-jour-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013/2013-06-19-orchard-harvest-2013-jour-2.md": {
	id: "2013/2013-06-19-orchard-harvest-2013-jour-2.md";
  slug: "orchard-harvest-2013-jour-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013/2013-09-11-orchard-community-member.md": {
	id: "2013/2013-09-11-orchard-community-member.md";
  slug: "orchard-community-member";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2014/2014-01-31-kiss.md": {
	id: "2014/2014-01-31-kiss.md";
  slug: "kiss";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2014/2014-05-09-orchard-harvest-2014.md": {
	id: "2014/2014-05-09-orchard-harvest-2014.md";
  slug: "orchard-harvest-2014";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2014/2014-06-06-pebkac.md": {
	id: "2014/2014-06-06-pebkac.md";
  slug: "pebkac";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2014/2014-06-17-recapitulatif-conference-orchard-harvest-2014.md": {
	id: "2014/2014-06-17-recapitulatif-conference-orchard-harvest-2014.md";
  slug: "recapitulatif-conference-orchard-harvest-2014";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2014/2014-07-01-microsoft-most-valuable-professional-asp-net-iis.md": {
	id: "2014/2014-07-01-microsoft-most-valuable-professional-asp-net-iis.md";
  slug: "microsoft-most-valuable-professional-asp-net-iis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2014/2014-08-01-mvp-award-2014.md": {
	id: "2014/2014-08-01-mvp-award-2014.md";
  slug: "mvp-award-2014";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2015/2015-01-31-regle-d-or.md": {
	id: "2015/2015-01-31-regle-d-or.md";
  slug: "regle-d-or";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2015/2015-06-06-look-to-your-left.md": {
	id: "2015/2015-06-06-look-to-your-left.md";
  slug: "look-to-your-left";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2015/2015-08-01-mvp-award-2015.md": {
	id: "2015/2015-08-01-mvp-award-2015.md";
  slug: "mvp-award-2015";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2015/2015-09-13-orchard-harvest-2015.md": {
	id: "2015/2015-09-13-orchard-harvest-2015.md";
  slug: "orchard-harvest-2015";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2015/2015-10-08-orchard-harvest-2015-summary.md": {
	id: "2015/2015-10-08-orchard-harvest-2015-summary.md";
  slug: "orchard-harvest-2015-summary";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2016/2016-01-31-solid.md": {
	id: "2016/2016-01-31-solid.md";
  slug: "solid";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2016/2016-06-06-less-is-more.md": {
	id: "2016/2016-06-06-less-is-more.md";
  slug: "less-is-more";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2016/2016-08-01-mvp-award-2016.md": {
	id: "2016/2016-08-01-mvp-award-2016.md";
  slug: "mvp-award-2016";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2016/2016-12-03-microsoft-mvp-summit-2016.md": {
	id: "2016/2016-12-03-microsoft-mvp-summit-2016.md";
  slug: "microsoft-mvp-summit-2016.";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2016/2016-12-28-orchard-harvest-2017.md": {
	id: "2016/2016-12-28-orchard-harvest-2017.md";
  slug: "orchard-harvest-2017";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2017/2017-02-28-orchard-harvest-in-new-york.md": {
	id: "2017/2017-02-28-orchard-harvest-in-new-york.md";
  slug: "orchard-harvest-in-new-york";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2017/2017-11-21-orchard-core-beta.md": {
	id: "2017/2017-11-21-orchard-core-beta.md";
  slug: "orchard-core-beta";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018/2018-01-31-four-stages-of-competence.md": {
	id: "2018/2018-01-31-four-stages-of-competence.md";
  slug: "four-stages-of-competence";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018/2018-03-14-pi.md": {
	id: "2018/2018-03-14-pi.md";
  slug: "pi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018/2018-06-06-dots.md": {
	id: "2018/2018-06-06-dots.md";
  slug: "dots";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018/2018-06-23-orchard-core-beta-2.md": {
	id: "2018/2018-06-23-orchard-core-beta-2.md";
  slug: "orchard-core-beta-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018/2018-08-01-mvp-award-2018.md": {
	id: "2018/2018-08-01-mvp-award-2018.md";
  slug: "mvp-award-2018";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019/2019-01-31-dunning-kruger-effect.md": {
	id: "2019/2019-01-31-dunning-kruger-effect.md";
  slug: "dunning-kruger-effect";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019/2019-03-14-pi-animation.md": {
	id: "2019/2019-03-14-pi-animation.md";
  slug: "pi-animation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019/2019-04-04-orchard-core-beta-3.md": {
	id: "2019/2019-04-04-orchard-core-beta-3.md";
  slug: "orchard-core-beta-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019/2019-06-06-nato-phonetic-alphabet.md": {
	id: "2019/2019-06-06-nato-phonetic-alphabet.md";
  slug: "nato-phonetic-alphabet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019/2019-08-01-mvp-award-2019.md": {
	id: "2019/2019-08-01-mvp-award-2019.md";
  slug: "mvp-award-2019";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019/2019-09-24-orchard-core-rc-1.md": {
	id: "2019/2019-09-24-orchard-core-rc-1.md";
  slug: "orchard-core-rc-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020/2020-01-31-how-to-fix-a-bug.md": {
	id: "2020/2020-01-31-how-to-fix-a-bug.md";
  slug: "how-to-fix-a-bug";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020/2020-03-14-linq.md": {
	id: "2020/2020-03-14-linq.md";
  slug: "linq";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020/2020-06-06-fibonacci-sequence.md": {
	id: "2020/2020-06-06-fibonacci-sequence.md";
  slug: "fibonacci-sequence";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020/2020-06-13-orchard-core-rc-2.md": {
	id: "2020/2020-06-13-orchard-core-rc-2.md";
  slug: "orchard-core-rc-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020/2020-08-01-mvp-award-2020.md": {
	id: "2020/2020-08-01-mvp-award-2020.md";
  slug: "mvp-award-2020";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021/2021-01-31-3d.md": {
	id: "2021/2021-01-31-3d.md";
  slug: "3d";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021/2021-03-14-winget.md": {
	id: "2021/2021-03-14-winget.md";
  slug: "winget";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021/2021-06-06-morse.md": {
	id: "2021/2021-06-06-morse.md";
  slug: "morse";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021/2021-07-22-orchard-core-1.0.md": {
	id: "2021/2021-07-22-orchard-core-1.0.md";
  slug: "orchard-core-1.0";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021/2021-08-01-mvp-award-2021.md": {
	id: "2021/2021-08-01-mvp-award-2021.md";
  slug: "mvp-award-2021";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021/2021-11-02-orchard-core-1.1.md": {
	id: "2021/2021-11-02-orchard-core-1.1.md";
  slug: "orchard-core-1.1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022/2022-01-06-orchard-core-1.2.md": {
	id: "2022/2022-01-06-orchard-core-1.2.md";
  slug: "orchard-core-1.2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022/2022-01-31-bonjour.md": {
	id: "2022/2022-01-31-bonjour.md";
  slug: "bonjour";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022/2022-03-10-orchard-core-1.3.md": {
	id: "2022/2022-03-10-orchard-core-1.3.md";
  slug: "orchard-core-1.3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022/2022-04-23-learn-kana.md": {
	id: "2022/2022-04-23-learn-kana.md";
  slug: "learn-kana";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022/2022-06-01-orchard-core-1.4.md": {
	id: "2022/2022-06-01-orchard-core-1.4.md";
  slug: "orchard-core-1.4";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022/2022-08-01-mvp-award-2022.md": {
	id: "2022/2022-08-01-mvp-award-2022.md";
  slug: "mvp-award-2022";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022/2022-11-04-orchard-core-1.5.md": {
	id: "2022/2022-11-04-orchard-core-1.5.md";
  slug: "orchard-core-1.5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023/2023-04-13-orchard-core-1.6.md": {
	id: "2023/2023-04-13-orchard-core-1.6.md";
  slug: "orchard-core-1.6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023/2023-09-05-orchard-core-1.7.md": {
	id: "2023/2023-09-05-orchard-core-1.7.md";
  slug: "orchard-core-1.7";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023/2023-10-13-orchard-core-1.7.1.md": {
	id: "2023/2023-10-13-orchard-core-1.7.1.md";
  slug: "orchard-core-1.7.1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023/2023-10-18-orchard-core-1.7.2.md": {
	id: "2023/2023-10-18-orchard-core-1.7.2.md";
  slug: "orchard-core-1.7.2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024/2024-01-02-orchard-core-1.8.md": {
	id: "2024/2024-01-02-orchard-core-1.8.md";
  slug: "orchard-core-1.8";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024/2024-01-09-orchard-core-1.8.1.md": {
	id: "2024/2024-01-09-orchard-core-1.8.1.md";
  slug: "orchard-core-1.8.1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024/2024-01-09-orchard-core-1.8.2.md": {
	id: "2024/2024-01-09-orchard-core-1.8.2.md";
  slug: "orchard-core-1.8.2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024/2024-04-25-orchard-core-1.8.3.md": {
	id: "2024/2024-04-25-orchard-core-1.8.3.md";
  slug: "orchard-core-1.8.3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../src/content/config.js");
}
