<div class="taskItem">
    <div class="display" v-if="state.ui=='display'">
        <input type="checkbox" id="ch_{% data.id %}" v-model="data.complete">
        <span class="label" v-for="tag in data.tags">{% tag.title %}</span><a v-link="{name:'detail', params:{id: data.id}}">{% data.title %}</a>
        <span class="pull-right">
            <a href="javascript:void('to edit');" @click="render('editing')"><i class="fa fa-pencil-square-o"></i></a>
            <a href="javascript:void('del');" @click="delete"><i class="fa fa-trash"></i></a>
        </span>
    </div>
    <div class="editing" v-else>
        <form @submit.prevent="save">
            <p>
                <input type="checkbox" id="ch_{% data.id %}" v-model="data.complete" disabled="">
                <input type="text" v-model="title" v-el:input class="form-control">
            </p>
            <p>
                <button type="submit" class="btn"><i class="fa fa-check"></i> 编辑完成</button>
                <button type="button" class="btn ui-ghost" @click="render('display')"><i class="fa fa-times"></i> 取消</button>
            </p>
        </form>
    </div>
</div>