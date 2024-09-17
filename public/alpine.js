function forumApp() {
    return {
        posts: [],
        comments: {},
        selectedPostId: null,
        showCommentBoxStatus: {},
        newComment: {},

        async init() {
            this.posts = await this.fetchPosts();
            for (let post of this.posts) {
                this.comments[post.id] = await this.fetchComments(post.id);
                this.showCommentBoxStatus[post.id] = false;
                this.newComment[post.id] = '';
                post.liked = false;  // Initialize liked status
            }
        },

        async fetchPosts() {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) throw new Error('Failed to fetch posts');
                return await response.json();
            } catch (error) {
                console.error('Error fetching posts:', error);
                return [];
            }
        },

        async fetchComments(postId) {
            const response = await fetch(`/api/comments/${postId}`);
            return response.json();
        },

        async likePost(postId) {
            const post = this.posts.find(p => p.id === postId);
            post.liked = !post.liked;  // Toggle like status
        },

        toggleFullDescription(postId) {
            const post = this.posts.find(p => p.id === postId);
            post.showFullDescription = !post.showFullDescription;
        },

        toggleComments(postId) {
            this.selectedPostId = this.selectedPostId === postId ? null : postId;
        },

        showCommentBox(postId) {
            this.showCommentBoxStatus[postId] = true;
        },

        hideCommentBox(postId) {
            this.showCommentBoxStatus[postId] = false;
        },

        async saveComment(postId) {
            const comment = this.newComment[postId];
            if (comment.trim() === '') return; // Do not save empty comments

            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: postId, comment })
            });

            if (response.ok) {
                const newComment = await response.json();
                this.comments[postId].push({ id: newComment.id, comment });
                this.newComment[postId] = '';
                this.hideCommentBox(postId);
            }
        },

        async deleteComment(postId, commentId) {
            const response = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
            if (response.ok) {
                this.comments[postId] = this.comments[postId].filter(c => c.id !== commentId);
            }
        }
    };
}
