export type Tweet = {
    edit_history_tweet_ids: string[];
    id: string;
    text: string;
};
export type TweetMeta = {
    newest_id: string;
    oldest_id: string;
    result_count: number;
    next_token: string;
};
export type TwitterResponse = {
        data?: Tweet[];
        meta: TweetMeta;
};
export type Word = {
    value: string;
    count: number;
}