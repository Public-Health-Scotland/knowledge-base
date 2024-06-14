(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{311:function(t,e,n){var content=n(452);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("266611aa",content,!0,{sourceMap:!1})},451:function(t,e,n){"use strict";n(311)},452:function(t,e,n){var o=n(59)((function(i){return i[1]}));o.push([t.i,".breadcrumb[data-v-acf9e26e]{background-color:#fff}.card[data-v-acf9e26e]{border:none;margin-top:2rem}.card-title[data-v-acf9e26e]{font-size:1.7rem!important;margin-bottom:1.3rem}.card-subtitle[data-v-acf9e26e]{font-size:1.2rem!important;margin-bottom:1.2rem!important}.card-text[data-v-acf9e26e]{font-weight:400!important}.card-body[data-v-acf9e26e]{padding-left:8rem;padding-right:8rem;padding-top:3rem}.link[data-v-acf9e26e]{color:#007bff;cursor:pointer}.text-image[data-v-acf9e26e]{margin:auto;width:80%}",""]),o.locals={},t.exports=o},462:function(t,e,n){"use strict";n.r(e);var o={data:function(){return{tabIndex:0}},methods:{}},r=(n(451),n(50)),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",[e("b-breadcrumb",[e("b-breadcrumb-item",{on:{click:function(e){return t.$router.push("/")}}},[t._v("Home")]),t._v(" "),e("b-breadcrumb-item",{on:{click:function(e){return t.$router.push("/docs")}}},[t._v("\n      Documentation\n    ")]),t._v(" "),e("b-breadcrumb-item",{attrs:{active:""}},[t._v("Quick Start Guides")]),t._v(" "),e("b-breadcrumb-item",{attrs:{active:""}},[t._v("Posit Workbench")])],1),t._v(" "),e("b-row",{staticClass:"pt-4"},[e("b-col",[e("h3",[t._v("Quick Start - Posit Workbench")])])],1),t._v(" "),e("div",[e("b-tabs",{staticClass:"mt-4",attrs:{align:"center"},model:{value:t.tabIndex,callback:function(e){t.tabIndex=e},expression:"tabIndex"}},[e("b-tab",{attrs:{title:"Setup"}},[e("b-card",[e("h4",[t._v("Welcome to the Posit Workbench Quick Start Guide")]),t._v(" "),e("b-card-text",[t._v("\n            This quick start guide is aimed at new Posit Workbench users, or\n            those who need a refresher in how to use it. You can navigate\n            between sections using the tab buttons at the top or buttons to\n            progress through each section at the bottom of every page. This\n            guide will take you through:\n            "),e("ul",{staticClass:"mt-2"},[e("li",[t._v("Setup")]),t._v(" "),e("li",[e("span",{staticClass:"link",on:{click:function(e){t.tabIndex=1}}},[t._v("Access")])]),t._v(" "),e("li",[e("span",{staticClass:"link",on:{click:function(e){t.tabIndex=2}}},[t._v("Best Practice")])]),t._v(" "),e("li",[e("span",{staticClass:"link",on:{click:function(e){t.tabIndex=3}}},[t._v("Troubleshooting")])])])]),t._v(" "),e("div",{staticClass:"mt-3"},[e("h4",{staticClass:"mt-5"},[t._v("Setup")]),t._v(" "),e("b-card-text",[e("ul",{staticClass:"mt-2"},[e("li",[e("strong",[t._v("Setup user account on Posit.")]),t._v("\n                  You'll need an account in order to access Posit Workbench,\n                  this is handled via Service Now with specific guidance here:\n                  "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=How%20to%20Access%20Posit%20Workbench.md"}},[t._v("\n                    Access to Posit Workbench ")]),t._v(".\n                  "),e("em",[t._v("\n                    Accounts may be deactivated following inactivity, the\n                    guidance document includes details on what to do if this\n                    affects you.\n                  ")])],1),t._v(" "),e("li",[e("strong",[t._v("Setup network.")]),t._v("\n                  You need to be on the internal network to access Posit\n                  Workbench. This can be accessed onsite or by using the VPN.\n                ")])])])],1),t._v(" "),e("div",{staticClass:"d-flex justify-content-end"},[e("b-button",{staticClass:"mt-2",attrs:{variant:"outline-primary"},on:{click:function(e){t.tabIndex=1}}},[t._v("Next Page")])],1)],1)],1),t._v(" "),e("b-tab",{attrs:{title:"Access"}},[e("b-card",[e("h4",[t._v("Accessing Posit Workbench")]),t._v(" "),e("b-card-text",[t._v("\n            To start using the PHS Posit Workbench, follow the steps below:\n            "),e("h5",{staticClass:"mt-3"},[t._v("Logging in")]),t._v(" "),e("ol",{staticClass:"mt-2"},[e("li",[t._v("\n                In a support browser (Microsoft Edge or Google Chrome),\n                navigate to the\n                "),e("a",{attrs:{target:"_blank",href:"https://pwb.publichealthscotland.org/auth-sign-in"}},[t._v("\n                  PHS Posit Workbench\n                ")]),t._v("\n                login page.\n              ")]),t._v(" "),e("li",[t._v("\n                Login using your PHS LDAP credentials (the same as your laptop\n                login).\n              ")])]),t._v(" "),e("h5",{staticClass:"mt-5"},[t._v("Starting a session")]),t._v(" "),e("ol",{staticClass:"mt-2"},[e("li",[t._v('\n                Open a new session by clicking the "+ New Session button" at\n                the top left of the Posit Workbench home screen.\n              ')]),t._v(" "),e("img",{staticClass:"text-image my-4 d-flex justify-content-center",attrs:{src:"/quick-start/posit-workbench/new_session_button_home.png",alt:"New session button home"}}),t._v(" "),e("li",[t._v("\n                Enter details for the session, including the IDE (e.g. RStudio\n                or VS Code). Pay particular attention to the memory and CPU\n                for your session. The default (1 CPU and 4096MB) will usually\n                be enough but a smaller session can also be appropriate for\n                some tasks. For more guidance on session size see\n                "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=Posit%20Workbench%20and%20Kubernetes.md"}},[t._v("Posit Workbench and Kubernetes")]),t._v(".\n              ")],1),t._v(" "),e("li",[t._v('\n                Click "Start session" and wait for session to be ready. Larger\n                sessions will take longer to allocate resources on the\n                infrastructure but any session should be available within\n                minutes of clicking "Start Session".\n              ')]),t._v(" "),e("img",{staticClass:"text-image my-4 d-flex justify-content-center",attrs:{src:"/quick-start/posit-workbench/start_session_popup.png",alt:"Start session popup"}})]),t._v(" "),e("h5",{staticClass:"mt-5"},[t._v("Starting to work")]),t._v(" "),e("ol",{staticClass:"mt-2"},[e("li",[t._v("\n                If 'Join session when ready' was selected from the 'New\n                session' diaglog box, the session should automatically start\n                and show the selected IDE (e.g. RStudio). Otherwise, select\n                the created session from the list on the Posit Workbench\n                homescreen.\n              ")]),t._v(" "),e("li",[t._v("\n                In RStudio, you are then asked to confirm you have read and\n                agree to the\n                "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=Acceptable%20Usage%20Policy%20for%20Posit%20Workbench.md"}},[t._v("Acceptable Use Policy")]),t._v("\n                in the R console with an alternating prompt keyword.\n              ")],1)])]),t._v(" "),e("div",{staticClass:"d-flex justify-content-between"},[e("b-button",{staticClass:"mt-2",attrs:{variant:"outline-primary"},on:{click:function(e){t.tabIndex=0}}},[t._v("Prev Page")]),t._v(" "),e("b-button",{staticClass:"mt-2",attrs:{variant:"outline-primary"},on:{click:function(e){t.tabIndex=2}}},[t._v("Next Page")])],1)],1)],1),t._v(" "),e("b-tab",{attrs:{title:"Best Practice"}},[e("b-card",[e("h4",[t._v("Using Posit Workbench")]),t._v(" "),e("b-card-text",[t._v("\n            To be able to make the most efficient and robust use of Posit\n            Workbench for any task, it is important to follow best practice.\n            This includes:\n            "),e("ul",{staticClass:"mt-2"},[e("li",[e("strong",[t._v("Only request as much memory and as many CPUs you need for\n                  your work")]),t._v(", not the max you have access to. This will maximise the\n                performance and minimise the costs. For more guidance on\n                memory see\n                "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=Posit%20Workbench%20and%20Kubernetes.md"}},[t._v("Posit Workbench and Kubernetes")]),t._v(".\n              ")],1),t._v(" "),e("li",[e("strong",[t._v("Close your session(s)")]),t._v(" when finished working\n                on that project or are going to be taking a longer than 10\n                minute break, by clicking\n                "),e("img",{attrs:{src:"/quick-start/posit-workbench/close_session.png",alt:"Close session button"}}),t._v(". All open sessions will automatically close at 8pm, unless\n                they are marked “NIGHT”. For more guidance see\n                "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=Overnight%20Sessions.md"}},[t._v("Overnight Sessions")]),t._v(".\n              ")],1),t._v(" "),e("li",[e("strong",[t._v("If working in a large project stored on stats, use a\n                  'project opener session'.")]),t._v("\n                This utilises a small session which has minimal impact on the\n                infrastructure to then launch the larger session. For more\n                guidance see\n                "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=FAQs.md#how-do-i-open-or-switch-to-another-project"}},[t._v("Project Opener Sessions")]),t._v("\n                in the FAQs section.\n              ")],1)])]),t._v(" "),e("div",{staticClass:"d-flex justify-content-between"},[e("b-button",{staticClass:"mt-2",attrs:{variant:"outline-primary"},on:{click:function(e){t.tabIndex=1}}},[t._v("Prev Page")]),t._v(" "),e("b-button",{staticClass:"mt-2",attrs:{variant:"outline-primary"},on:{click:function(e){t.tabIndex=3}}},[t._v("Next Page")])],1)],1)],1),t._v(" "),e("b-tab",{attrs:{title:"Troubleshooting"}},[e("b-card",[e("h4",[t._v("Getting Help with Posit Workbench")]),t._v(" "),e("b-card-text",[t._v("\n            It's a normal part of the process to debug and troubleshoot\n            issues. However, sometimes it can make it more difficult when\n            you're not sure if it's the infrastructure. Here are some common\n            concerns and links to help you resolve them:\n            "),e("ul",{staticClass:"mt-2"},[e("li",[e("strong",[t._v("Sessions closing?")]),t._v(" Check that you have enough\n                memory in your session for the work you're trying to do.\n                Memory usage can be seen here\n                "),e("img",{attrs:{src:"/quick-start/posit-workbench/memory_indicator.png",alt:"Memory usage indicator"}}),t._v(". If you need more memory, request it from the Data Science\n                Team by following the guidance\n                "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=Posit%20Support.md"}},[t._v("here")])],1),t._v(" "),e("li",[e("strong",[t._v("Package installation issues?")]),t._v(" There are\n                various packages, especially for geospatial work, that require\n                a different installation process. See the\n                "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=FAQs.md#installing-packages"}},[t._v("Installing Packages")]),t._v("\n                FAQ section.\n              ")],1),t._v(" "),e("li",[e("strong",[t._v("Other issues?")]),t._v(" There's extensive\n                "),e("NuxtLink",{attrs:{to:"/docs/Posit%20Infrastructure?doc=Posit%20Support.md"}},[t._v("Posit Support")]),t._v("\n                guidance here, including troubleshooting steps, a link to the\n                "),e("a",{attrs:{target:"_blank",href:"https://teams.microsoft.com/l/team/19%3Ae9f55a12b7d94ef49877ff455a07f035%40thread.tacv2/conversations?groupId=ec4250f9-b70a-4f32-9372-a232ccb4f713&tenantId=10efe0bd-a030-4bca-809c-b5e6745e499a"}},[t._v("\n                  PHS Data and Intelligence Forum")]),t._v("\n                for community support, and details on how to raise specific\n                issues.\n              ")],1)])]),t._v(" "),e("div",{staticClass:"d-flex justify-content-between"},[e("b-button",{staticClass:"mt-2",attrs:{variant:"outline-primary"},on:{click:function(e){t.tabIndex=2}}},[t._v("Prev Page")])],1)],1)],1)],1)],1)],1)}),[],!1,null,"acf9e26e",null);e.default=component.exports}}]);