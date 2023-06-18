export type PostType = {
    /**
     * 帖子 ID
     */
    postId: number;

    /**
     * 帖子标题
     */
    title: string;

    /**
     * 帖子内容
     */
    content: string;

    /**
     * 帖子发布时间
     */
    postTime: Date;

    /**
     * 作者 ID
     */
    authorId: number;

    /**
     * 浏览次数
     */
    viewCount: number;


    /**
     * 话题 ID
     */
    topicId: number;


    /**
     * 审核状态：0-待审核；1-已通过；2-未通过
     */
    postStatus: number;

    /**
     * 是否置顶：0-否；1-是
     */
    isTop: number;


    imageUrl: string;


}
