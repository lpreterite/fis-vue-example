<section id="task-detail">
    <header>
        <h1 :class="{animation: !$loadingRouteData}">
            <a href="#" v-link="{name:'index'}"><i class="fa fa-angle-left"></i> 返回</a>
        </h1>
    </header>
    <div :class="state.ui">
        <template v-if="state.ui=='static'">
            <div class="text-center" v-if="$loadingRouteData">loading...</div>
            <template v-else>
                <article>
                    <div class="task-title">
                        <input type="checkbox" v-model="detail.complete">
                        <span class="title"><span class="label" v-for="tag in detail.tags">{% tag.title %}</span><span>{% detail.title %}</span></span>
                    </div>
                    <div class="task-description">{% detail.description %}</div>
                </article>
                <footer>
                    <p class="text-right">
                        <a href="javascript:;" class="pure-button pure-button-primary ui-slick ui-sm" @click="render('editing')">编辑</a>
                        <a href="javascript:;" class="pure-button ui-slick ui-sm" @click="delete">删除</a>
                    </p>
                </footer>
            </template>
        </template>
        <template v-else>
            <article>
                <form @submit.prevent="save">
                    <div class="task-title">
                        <input type="checkbox" v-model="detail.complete" disabled="">
                        <input type="text" v-model="title" v-el:input class="form-control">
                    </div>
                    <div class="pure-form task-description">
                        <textarea class="pure-input" name="description" cols="30" rows="5" v-model="detail.description"></textarea>
                    </div>
                </form>
            </article>
            <footer>
                <p class="text-right">
                    <a href="javascript:;" class="pure-button pure-button-primary ui-slick ui-sm" @click="save">编辑完成</a>
                    <a href="javascript:;" class="pure-button ui-slick ui-sm" @click="render('static')">取消</a>
                </p>
            </footer>
        </template>
    </div>
</section>