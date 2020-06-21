<template>
  <div class="layout app">
    <Layout>
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :width="160"
        :collapsed-width="78"
        @on-collapse="siderCollapsed"
        v-model="isCollapsed"
      >
        <Menu active-name="3-3" theme="dark" width="auto" :class="menuitemClasses">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>basic-component</span>
            </template>
            <MenuItem name="1-1" to="/basic/button">Button</MenuItem>
            <MenuItem name="1-2" to="/basic/icon">Icon</MenuItem>
            <MenuItem name="1-3" to="/basic/grid">Grid</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              <span>layout</span>
            </template>
            <MenuItem name="2-1" to="/layout/basic">LayoutBasic</MenuItem>
            <MenuItem name="2-2" to="/layout/layout-1">Layout-1</MenuItem>
            <MenuItem name="2-3" to="/layout/layout-2">Layout-2</MenuItem>
            <MenuItem name="2-4" to="/layout/layout-3">Layout-3</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              <span>form</span>
            </template>
            <MenuItem name="3-1" to="/form/input">Input</MenuItem>
            <MenuItem name="3-2" to="/form/radio">Radio</MenuItem>
            <MenuItem name="3-3" to="/form/checkbox">Checkbox</MenuItem>
          </Submenu>
        </Menu>
      </Sider>

      <Layout>
        <Header class="layout-header-bar" style="padding: 0;">
          <Icon
            type="md-menu"
            size="24"
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
          ></Icon>
        </Header>
        <Content
          :style="{margin: '20px', minHeight: '280px', background: '#fff', overflow: 'hidden'}"
        >
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
      // this.isCollapsed = !this.isCollapsed
    },
    siderCollapsed() {
      // console.log('siderCollapsed')
    }
  }
};
</script>

<style lang="less">
article h4 {
  margin: 20px 5px 10px 5px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.app .layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
