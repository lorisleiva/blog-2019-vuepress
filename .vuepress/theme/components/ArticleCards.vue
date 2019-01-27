<template>
    <div class="post-feed">
        <article class="post-card" v-for="article in articles">
            <a class="post-card-image-link" :href="article.path">
                <div class="post-card-image" :style="`background-image: url(${article.frontmatter.image})`"></div>
            </a>
            <div class="post-card-content">
                <a class="post-card-content-link" :href="article.path">
                    <header class="post-card-header">
                        <span class="post-card-tags">{{article.frontmatter.tags[0]}}</span>
                        <h2 class="post-card-title">{{article.title}}</h2>
                    </header>
                    <section class="post-card-excerpt">
                        <p v-text="article.frontmatter.description"></p>
                    </section>
                </a>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    props: ['articles'],
}
</script>

<style scoped>
.post-feed {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
    padding: 40px 0 0 0;
}

.post-card {
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 0 20px 40px;
    min-height: 300px;
    background: #fff center center;
    background-size: cover;
    border-radius: 5px;
    box-shadow: rgba(39,44,49,0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    transition: all 0.5s ease;
}

.post-card:hover {
    box-shadow: rgba(39,44,49,0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
}

.post-card-image-link {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: 5px 5px 0 0;
}

.post-card-image {
    width: auto;
    height: 200px;
    background: config('colors.grey-light') no-repeat center center;
    background-size: cover;
}

.post-card-content-link {
    position: relative;
    flex-grow: 1;
    display: block;
    padding: 25px 25px 0;
    color: config('colors.grey-dark');
}

.post-card-content-link:hover {
    text-decoration: none;
}

.post-card-tags {
    display: block;
    margin-bottom: 4px;
    color: config('colors.grey');
    font-size: 1.2rem;
    line-height: 1.15em;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.post-card-title {
    margin-top: 0;
}

.post-card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.post-card-excerpt {
    font-family: Georgia, serif;
}

@media (min-width: 795px) {
    .post-feed .post-card:nth-child(6n+1) {
        flex: 1 1 100%;
        flex-direction: row;
    }

    .post-feed .post-card:nth-child(6n+1) .post-card-image-link {
        position: relative;
        flex: 1 1 auto;
        border-radius: 5px 0 0 5px;
    }

    .post-feed .post-card:nth-child(6n+1) .post-card-image {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .post-feed .post-card:nth-child(6n+1) .post-card-content {
        flex: 0 1 357px;
    }

    .post-feed .post-card:nth-child(6n+1) h2 {
        font-size: 2.6rem;
    }

    .post-feed .post-card:nth-child(6n+1) p {
        font-size: 1.8rem;
        line-height: 1.55em;
    }

    .post-feed .post-card:nth-child(6n+1) .post-card-content-link {
        padding: 30px 40px 0;
    }
}

.site-header:after {
    display: none;
}

/* Adjust some margins for smaller screens */
@media (max-width: 650px) {
    .post-feed {
        padding-top: 5vw;
    }
    .post-card {
        margin: 0 20px 5vw;
    }
}

</style>
