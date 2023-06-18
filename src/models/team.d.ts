import {UserType} from "./user";

export type TeamType = {
    /**
     * id
     */
    id: number;

    /**
     * 队伍名称
     */
    name: string;

    /**
     * 描述
     */
    description: string;

    /**
     * 最大人数
     */
    maxNum: number;

    /**
     * 过期时间
     */
    expireTime: Date;

    /**
     * 用户id
     */
    userId: number;

    /**
     * 0 - 公开，1 - 私有，2 - 加密
     */
    status: number;

    /**
     * 创建时间
     */
    createTime: Date;

    /**
     * 更新时间
     */
    updateTime: Date;

    /**
     * 加入队伍用户
     */
    userVOS: UserType[];


    /**
     * 创建人用户信息
     */
    createUser: UserType;

    /**
     * 已加入的用户数
     */
    hasJoinNum: number;


    /**
     * 队伍头像
     */
    avatarUrl: string;


    /**
     * 是否已加入队伍
     */
    hasJoin: boolean;
}
