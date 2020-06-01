/**
    入驻小区
**/
(function(vc){
    var DEFAULT_PAGE = 1;
    var DEFAULT_ROWS = 10;
    vc.extends({
        data:{
            jobManageInfo:{
                jobs:[],
                name:'',
                total:0,
                records:1,
                conditions:{
                    taskId:'',
                    taskName:'',
                    taskType:''
                }
            }
        },
        _initMethod:function(){
            vc.component._listJobs(DEFAULT_PAGE, DEFAULT_ROWS);
        },
        _initEvent:function(){
            vc.on('jobManage','listJob',function(_param){
                  vc.component._listJobs(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             vc.on('pagination','page_event',function(_currentPage){
                vc.component._listJobs(_currentPage,DEFAULT_ROWS);
            });
        },
        methods:{
            _listJobs:function(_page, _rows){
                vc.component.jobManageInfo.conditions.page = _page;
                vc.component.jobManageInfo.conditions.row = _rows;
                var param = {
                    params:vc.component.jobManageInfo.conditions
                 };

               //发送get请求
               vc.http.get('jobManage',
                            'list',
                             param,
                             function(json,res){
                                var _jobManageInfo=JSON.parse(json);
                                vc.component.jobManageInfo.total = _jobManageInfo.total;
                                vc.component.jobManageInfo.records = _jobManageInfo.records;
                                vc.component.jobManageInfo.jobs = _jobManageInfo.jobs;
                                vc.emit('pagination','init',{
                                     total:vc.component.jobManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },
            _openAddJobModal:function(){
                vc.emit('addJob','openAddJobModal',{});
            },
            _openEditJobModel:function(_job){
                vc.emit('editJob','openEditJobModal',_job);
            },
            _openDeleteJobModel:function(_job){
                vc.emit('deleteJob','openDeleteJobModal',_job);
            },
            _queryJobMethod:function(){
                vc.component._listJobs(DEFAULT_PAGE, DEFAULT_ROWS);

            }
        }
    });
})(window.vc);
