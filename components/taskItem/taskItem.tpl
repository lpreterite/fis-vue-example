<div class="taskItem">
    <div class="display" v-if="state.ui=='display'">
        <input type="checkbox" id="ch_{% data.id %}" v-model="data.complete">
        <span class="title"><span class="label" v-for="tag in data.tags">{% tag.title %}</span><a v-link="{name:'detail', params:{id: data.id}}">{% data.title %}</a></span>
        <span class="fun" v-if="!isNews">
            <a href="javascript:void('to edit');" @click="render('editing')"><i class="fa fa-pencil-square-o"></i></a>
            <a href="javascript:void('del');" @click="delete"><i class="fa fa-trash"></i></a>
        </span>
    </div>
    <div class="editing" v-else>
        <form @submit.prevent="save">
            <input type="checkbox" id="ch_{% data.id %}" v-model="data.complete" disabled="">
            <input type="text" v-model="title" v-el:input class="title form-control">
            <span class="fun">
                <button type="submit" class="pure-button pure-button-primary ui-slick ui-sm"><i class="fa fa-check"></i> {% isNews ? '添加新任务' : '编辑完成' %}</button>
                <button type="button" class="pure-button ui-slick ui-sm" @click="render('display')"><i class="fa fa-times"></i> 取消</button>
            </span>
        </form>
    </div>
</div>