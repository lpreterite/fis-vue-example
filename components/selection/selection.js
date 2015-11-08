/**
 * @require libs/select2/select2.css 
 */

var $ = require('jquery'),
    select2 = require('libs/select2/select2')
module.exports = {
    template: '<select v-el:select multiple></select>',
    props: {
        model: {
            required: true,
            twoWay: true
        },
        tags: {
            required: true,
            type: Array,
            default: []
        },
        isTags: {
            required: false,
            default: true
        },
        split: {
            required: false,
            type: Array,
            default: function(){
                return [',', ' ','#']
            }
        },
        unselect: {
            required: false,
            type: Array,
            default: function(){
                return []
            }
        },
        placeholder: {
            required: false,
            type: String
        }
    },
    ready: function(){
        this.$els.select = $(this.$els.select).select2({
            isTags: this.isTags,
            tokenSeparators: this.split,
            tags: this.tags,
            placeholder: this.placeholder,
            language: require('/libs/select2/i18n/zh-CN')
        })
        .on('change',function(e){
            this.model = this.$els.select.val()
        }.bind(this))
        .on('select2:unselecting',function(e){
            for (var i = this.unselect.length - 1; i >= 0; i--) {
                if(e.params.args.data.id != this.unselect[i]) continue
                e.preventDefault()
            }
        }.bind(this))
    },
    watch: {
        tags: function(val){
            this.$els.select.select2({
                data: this.tags
            })
            .val(this.model).trigger('change')
        }
    },
    detached: function(){
        this.$els.select.off('select2:unselecting')
    }
}