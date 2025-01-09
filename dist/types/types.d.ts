export interface GitConfig {
    user: {
        name: string;
        email: string;
    };
    core?: {
        editor?: string;
        [key: string]: any;
    };
    [key: string]: any;
}
