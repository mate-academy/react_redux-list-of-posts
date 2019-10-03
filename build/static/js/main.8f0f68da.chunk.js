(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,a){e.exports=a(41)},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(5),o=a.n(s),i=a(2),c=a(6),u=a(19),l=a(13),m=a(4),p=a(14),d=a(10),E=a.n(d),f=a(15),O=function(){var e=Object(f.a)(E.a.mark(function e(t){var a;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return a=e.sent,e.abrupt("return",a.json());case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach(function(t){Object(l.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var h={FILTER_POSTS:"POSTS::FILTER",RESET_POSTS:"POSTS::RESET",SET_DATA_TO_STORE:"POSTS::TO-STORE",ISLOADING_POSTS:"POSTS::ISLOADING",DELETE_POST:"POSTS::DELETE-ITEM",DELETE_COMMENT:"COMMENT::DELETE"},y=function(e){return{type:h.FILTER_POSTS,payload:e}},T=function(){return{type:h.ISLOADING_POSTS}},_=function(){return function(e){P.dispatch(T()),Promise.all([O("https://jsonplaceholder.typicode.com/posts"),O("https://jsonplaceholder.typicode.com/users"),O("https://jsonplaceholder.typicode.com/comments")]).then(function(e){var t,a=Object(u.a)(e,3),n=a[0],r=a[1],s=a[2];P.dispatch(function(e,t,a){return{type:h.SET_DATA_TO_STORE,payload:{postsData:e,commentsData:t,users:a}}}((t=r,n.map(function(e){return b({},e,{user:t.find(function(t){return t.id===e.userId})})})),s,r)),P.dispatch(T())})}},S={posts:[],originalPosts:[],comments:[],users:[],isLoading:!1},P=Object(m.c)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case h.FILTER_POSTS:return b({},e,{posts:Object(c.a)(e.originalPosts).filter(function(e){return e.title.includes(t.payload)})});case h.RESET_POSTS:return b({},e,{posts:Object(c.a)(e.originalPosts)});case h.ISLOADING_TODOS:return b({},e,{isLoading:!e.isLoading});case h.SET_DATA_TO_STORE:return b({},e,{posts:t.payload.postsData,originalPosts:t.payload.postsData,comments:t.payload.commentsData,users:t.payload.users});case h.DELETE_POST:return b({},e,{posts:Object(c.a)(e.posts).filter(function(e){return e.id!==t.payload})});case h.DELETE_COMMENT:return b({},e,{comments:e.comments.filter(function(e){return e.id!==t.payload})});default:return e}},Object(m.a)(p.a)),v=(a(33),a(16)),j=a(17),N=a(20),D=a(18),L=a(21),w=(a(34),a(35),a(1)),I=a.n(w),k=(I.a.string,I.a.string,I.a.shape({street:I.a.string,suite:I.a.string,city:I.a.string,zipcode:I.a.string,geo:I.a.shape({lat:I.a.string,lng:I.a.string})}),I.a.string,I.a.string,I.a.func,I.a.shape({postId:I.a.number,id:I.a.number,name:I.a.string,email:I.a.string,body:I.a.string})),R=(I.a.arrayOf(I.a.shape(k)),I.a.shape({id:I.a.number,name:I.a.string,username:I.a.string,email:I.a.string,phone:I.a.string,website:I.a.string,adress:I.a.shape({street:I.a.string,suite:I.a.string,city:I.a.string,zipcode:I.a.string,geo:I.a.shape({lat:I.a.string,lng:I.a.string})}),company:I.a.shape({name:I.a.string,catchPhrase:I.a.string,bs:I.a.string})})),x=(I.a.bool,I.a.arrayOf(I.a.shape({userId:I.a.number,id:I.a.number,title:I.a.string,body:I.a.string,user:I.a.shape(R)})),I.a.func,I.a.string,I.a.string,I.a.shape(R),I.a.number,I.a.func,I.a.arrayOf(I.a.shape({userId:I.a.number,id:I.a.number,title:I.a.string,body:I.a.string,user:I.a.shape(R)})),I.a.arrayOf(I.a.shape({userId:I.a.number,id:I.a.number,title:I.a.string,body:I.a.string})),I.a.arrayOf(I.a.shape(R)),I.a.arrayOf(I.a.shape(k)),function(e){var t=e.name,a=e.email,n=e.address;return r.a.createElement("div",null,r.a.createElement("h2",{className:"user__name"},t),r.a.createElement("p",{className:"user__email"},a),r.a.createElement("p",{className:"user__address"},"".concat(n.street,", ").concat(n.street,", ").concat(n.city)))}),A=(a(36),function(e){var t=e.comment,a=e.email,n=e.deleteComment;return r.a.createElement("div",{className:"comment"},r.a.createElement("button",{type:"button",onClick:n,className:"destroy-comment"}),r.a.createElement("p",{className:"comment__email"},a),r.a.createElement("p",{className:"comment__text"},t))}),C=Object(i.b)(null,function(e,t){return{deleteComment:function(){return e((a=t.id,{type:h.DELETE_COMMENT,payload:a}));var a}}})(A),M=(a(37),function(e){var t=e.commentsList;return r.a.createElement("div",{className:"comment-list"},t.map(function(e){return r.a.createElement(C,{comment:e.body,key:e.id,id:e.id,email:e.email})}))}),F=Object(i.b)(function(e,t){return{commentsList:e.comments.filter(function(e){return e.postId===t.id})}})(M),G=(a(38),function(e){var t=e.title,a=e.text,n=e.user,s=e.id,o=e.deletePost;return r.a.createElement("div",{className:"post"},r.a.createElement("button",{type:"button",onClick:o,className:"destroy"}),r.a.createElement(x,{name:n.name,email:n.email,address:n.address}),r.a.createElement("h1",{className:"post__title"},t),r.a.createElement("p",{className:"post__text"},a),r.a.createElement(F,{id:s}))}),z=Object(i.b)(null,function(e,t){return{deletePost:function(){return e((a=t.id,{type:h.DELETE_POST,payload:a}));var a}}})(G),B=(a(39),function(e){var t=e.posts;return r.a.createElement("div",{className:"post-list"},t.map(function(e){var t=e.title,a=e.body,n=e.user,s=e.id;return r.a.createElement(z,{title:t,text:a,user:n,id:s,key:s})}))}),J=Object(i.b)(function(e){return{posts:e.posts}})(B),W=(a(40),function(e){var t=e.posts,a=e.users,n=e.comments;return r.a.createElement("div",{className:"header"},r.a.createElement("h1",{className:"header__title"},"Static list of posts"),r.a.createElement("p",{className:"header__text"},r.a.createElement("span",{className:"header__span"},"posts: "),t.length),r.a.createElement("p",{className:"header__text"},r.a.createElement("span",{className:"header__span"},"comments: "),n.length),r.a.createElement("p",{className:"header__text"},r.a.createElement("span",{className:"header__span"},"Users: "),a.length))}),U=Object(i.b)(function(e){return{users:e.users,posts:e.posts,comments:e.comments}})(W),$=function(e){function t(){return Object(v.a)(this,t),Object(N.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.isLoading,a=e.originalPosts,n=e.getData;return t?r.a.createElement("p",{className:"loading-text"},"Posts are loading now..."):0===a.length?r.a.createElement("button",{onClick:n,type:"button",className:"data-button"},"Load all posts"):r.a.createElement("main",null,r.a.createElement(U,null),r.a.createElement(J,null))}}]),t}(r.a.Component),q=Object(i.b)(function(e){return{originalPosts:e.originalPosts,isLoading:e.isLoading}},function(e){return{resetPosts:function(){return e({type:h.RESET_POSTS})},getData:function(){return e(_())},filterPosts:function(){return e(y)}}})($);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(i.a,{store:P},r.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.8f0f68da.chunk.js.map