<template>
    <div class="post-feed">
        <article class="post-card" v-for="article in articles">
            <a class="post-card-image-link" :href="article.path">
                <div class="post-card-image" :style="`background-image: url(${article.frontmatter.image})`"></div>
            </a>
            <div class="post-card-content">
                <a class="post-card-content-link" :href="article.path">
                    <header>
                        <div 
                            class="uppercase tracking-wide text-grey-dark text-sm font-semibold" 
                            v-text="article.frontmatter.tags[0]"
                        ></div>
                        <div 
                            class="font-sans text-2xl mb-4 border-0 leading-tight text-black font-semibold" 
                            v-text="article.title"
                        ></div>
                    </header>
                    <section>
                        <p 
                            class="font-content text-lg" 
                            v-text="article.frontmatter.description"
                        ></p>
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
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
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
    border-radius: config('borderRadius.default');
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
    border-radius: config('borderRadius.default') config('borderRadius.default') 0 0;
    border: none;
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
    border: none;
}

.post-card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

@media (min-width: 795px) {
    .post-feed .post-card:nth-child(3n+1) {
        flex: 1 1 100%;
        flex-direction: row;
    }

    .post-feed .post-card:nth-child(3n+1) .post-card-image-link {
        position: relative;
        flex: 1 1 auto;
        border-radius: config('borderRadius.default') 0 0 config('borderRadius.default');
    }

    .post-feed .post-card:nth-child(3n+1) .post-card-image {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .post-feed .post-card:nth-child(3n+1) .post-card-content {
        flex: 0 1 357px;
    }

    .post-feed .post-card:nth-child(3n+1) h2 {
        font-size: config('textSizes.3xl');
    }

    .post-feed .post-card:nth-child(3n+1) p {
        font-size: config('textSizes.xl');
        line-height: 1.55em;
    }

    .post-feed .post-card:nth-child(3n+1) .post-card-content-link {
        padding: 30px 40px 0;
    }
}

@media (max-width: 650px) {
    .post-card {
        margin: 0 20px 5vw;
    }
}
</style>
