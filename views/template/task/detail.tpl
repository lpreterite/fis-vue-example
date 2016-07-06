<section id="task-detail">
    <template v-if="state.ui=='static'">
        <header>
            <h1>
                <a href="#" v-link="{name:'index'}"><i class="fa fa-angle-left"></i> 返回</a>
            </h1>
        </header>
        <article>
            <h1>
                <input type="checkbox" v-model="detail.complete">
                <span class="label" v-for="tag in detail.tags">{% tag.title %}</span><span>{% detail.title %}</span>
            </h1>
            <p>
                <a href="javascript:;" @click="render('editing')">编辑</a>
                <a href="javascript:;" @click="delete">删除</a>
            </p>
            {% detail.description %}
        </article>
    </template>
    <template v-else>
        <header>
            <h1>
                <a href="#" v-link="{name:'index'}"><i class="fa fa-angle-left"></i> 返回</a>
            </h1>
        </header>
        <article>
            <form @submit.prevent="save">
                <h1>
                    <input type="checkbox" v-model="detail.complete" disabled="">
                    <input type="text" v-model="title" v-el:input class="form-control">
                </h1>
                <textarea class="form-control" name="description" cols="30" rows="5" v-model="detail.description"></textarea>
                <p>
                    <a href="javascript:;" @click="save">编辑完成</a>
                    <a href="javascript:;" @click="render('static')">取消</a>
                </p>
            </form>
        </article>
    </template>
</section>