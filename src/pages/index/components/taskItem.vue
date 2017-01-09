<template>
    <div class="taskItem" __vuec__>
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
</template>

<script>
    var task = require('models/task.model')

    module.exports = {
        name: "taskItem",
        props: {
            data: {
                default: function(){
                    return task.default()
                }
            },
            isNews:{
                default: true
            }
        },
        data: function(){
            return {
                title: '',
                state: {
                    ui: 'display'
                }
            }
        },
        methods: {
            complete: function(){
                task
                    .complete(this.data.id, this.data.complete)
                    .then(function(){

                    })
                    .catch(function(){

                    })
            },
            save: function(){
                var data = $.extend(this.data, task.dismantleTitle(this.title))
                task
                    .save(data)
                    .then(function(){
                        this.state.ui = 'display'
                        this.$emit('saved', this.data)
                    }.bind(this))
                    .catch(function(){

                    })
            },
            delete: function(){
                if(!confirm('确定删除 ' + this.data.title + '吗？')) return;

                task
                    .delete(this.data.id)
                    .then(function(){
                        this.$emit('remove', this.data)
                    }.bind(this))
                    .catch(function(){

                    })
            },
            render: function(state){
                switch(this.state.ui = state){
                    case 'display':
                        break;
                    case 'editing':
                        this.title = task.compoundTitile(this.data)
                        this.$nextTick(function(){
                            this.$els.input.focus()
                        })
                        break;
                }
                if(state == 'display'){
                    this.$emit('display', state)
                }
            },
            clear: function(){
                this.data = task.default()
                this.title = this.titleHandle
            }
        },
        watch: {
            'data.complete': function(){
                this.complete()
            }
        }
    }
</script>

<style lang="scss">
    .taskItem[__vuec__]{
        position: relative;
        .title{
            display: inline-block;
            padding: .25em;
        }
        input[type=checkbox]{
            position: absolute;
            top: 6px;
            left: 0;
        }
        .fun{
            text-align: right;
            margin-top: 5px;
            display: block;
            @media (min-width: 48em) {
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        
        .display{
            margin-left: 24px;
            .fun{
                float: right;
            }
        }
        .editing{
            margin-left: 24px;
            @media (min-width: 48em) {
                margin-right: 200px;
            }
            form{
                .title{
                    width: 100%;
                }
            }
        }
    }
</style>