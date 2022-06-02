import { EDirection } from '@constants/api.constant';

export interface IPagination {
    limit?: number;
    page?: number;
    sortBy?: string;
    direction?: EDirection;
}
