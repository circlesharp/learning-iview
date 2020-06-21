<template>
  <div class="hello">

    <!--  -->
    <article>
      <Button type="primary" ghost to="http://rtfm.work">Normal</Button>
      <Button type="primary" ghost to="http://rtfm.work" replace>No History</Button>
      <Button type="primary" ghost to="http://rtfm.work" target="_blank">New Window</Button>
    </article>

    <!--  -->
    <article>
      <ButtonGroup vertical>
        <Button icon="logo-facebook"></Button>
        <Button icon="logo-twitter"></Button>
        <Button icon="logo-googleplus"></Button>
        <Button icon="logo-tumblr"></Button>
      </ButtonGroup>
    </article>

    <!--  -->
    <article>
      <h4>Basic</h4>
      <br />
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button type="primary">Confirm</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button disabled>Yesterday</Button>
        <Button disabled>Today</Button>
        <Button disabled>Tomorrow</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button type="primary">L</Button>
        <Button>M</Button>
        <Button>M</Button>
        <Button type="dashed">R</Button>
      </ButtonGroup>
      <br />
      <h4>Icons</h4>
      <br />
      <ButtonGroup>
        <Button type="primary">
          <Icon type="ios-arrow-back"></Icon>Backward
        </Button>
        <Button type="primary">
          Forward<Icon type="ios-arrow-forward"></Icon>
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button type="primary" icon="ios-skip-backward"></Button>
        <Button type="primary" icon="ios-skip-forward"></Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button icon="ios-color-wand-outline"></Button>
        <Button icon="ios-sunny-outline"></Button>
        <Button icon="ios-crop"></Button>
        <Button icon="ios-color-filter-outline"></Button>
      </ButtonGroup>
      <br />
      <h4>Circle</h4>
      <ButtonGroup shape="circle">
        <Button type="primary">
          <Icon type="ios-arrow-back"></Icon>Backward
        </Button>
        <Button type="primary">
          Forward<Icon type="ios-arrow-forward"></Icon>
        </Button>
      </ButtonGroup>
      <ButtonGroup shape="circle">
        <Button type="primary" icon="ios-skip-backward"></Button>
        <Button type="primary" icon="ios-skip-forward"></Button>
      </ButtonGroup>
      <ButtonGroup shape="circle">
        <Button icon="ios-color-wand-outline"></Button>
        <Button icon="ios-sunny-outline"></Button>
        <Button icon="ios-crop"></Button>
        <Button icon="ios-color-filter-outline"></Button>
      </ButtonGroup>
      <br />
      <h4>Size</h4>
      <br />
      <ButtonGroup size="large">
          <Button>Large</Button>
          <Button>Large</Button>
      </ButtonGroup>
      <ButtonGroup>
          <Button>Default</Button>
          <Button>Default</Button>
      </ButtonGroup>
      <ButtonGroup size="small">
          <Button>Small</Button>
          <Button>Small</Button>
      </ButtonGroup>
      <br />
      <ButtonGroup size="large" shape="circle">
          <Button>Large</Button>
          <Button>Large</Button>
      </ButtonGroup>
      <ButtonGroup shape="circle">
          <Button>Default</Button>
          <Button>Default</Button>
      </ButtonGroup>
      <ButtonGroup size="small" shape="circle">
          <Button>Small</Button>
          <Button>Small</Button>
      </ButtonGroup>
    </article>

    <!--  -->
    <article>
      <Button>Defalut</Button>
      <Button type="primary">primary</Button>
      <Button type="dashed">dashed</Button>
      <Button type="text">text</Button>
      <Button type="info">info</Button>
      <Button type="success">success</Button>
      <Button type="warning">warning</Button>
      <Button type="error">error</Button>
    </article>

    <!--  -->
    <article style="background: #ececec;">
      <Button>Defalut</Button>
      <Button ghost type="primary">primary</Button>
      <Button ghost type="dashed">dashed</Button>
      <Button ghost type="text">text</Button>
      <Button ghost type="info">info</Button>
      <Button ghost type="success">success</Button>
      <Button ghost type="warning">warning</Button>
      <Button ghost type="error">error</Button>
    </article>

    <!--  -->
    <article>
      <Button type="primary" shape="circle" icon="ios-search"></Button>
      <Button type="primary" icon="ios-search">search</Button>
      <Button type="primary" shape="circle" icon="ios-search">search</Button>
      <Button type="primary" shape="circle">search</Button>
    </article>

    <!--  -->
    <article>
      <RadioGroup
        v-model="buttonSize"
        type="button"
      >
        <Radio label="large">large</Radio>
        <Radio label="default">Default</Radio>
        <Radio label="small">Small</Radio>
      </RadioGroup>
      <br />
      <Button :size="buttonSize">Defalut</Button>
      <Button :size="buttonSize" type="primary">primary</Button>
      <Button :size="buttonSize" type="dashed">dashed</Button>
      <Button :size="buttonSize" type="text">text</Button>
      <br />
      <Button :size="buttonSize" icon="ios-download-outline" type="primary" shape="circle"></Button>
      <Button :size="buttonSize" icon="ios-download-outline" type="primary">Download</Button>
      <br />
      <ButtonGroup :size="buttonSize">
        <Button type="primary">
          <Icon type="ios-arrow-back" />Backward
        </Button>
        <Button type="primary">
          Forward<Icon type="ios-arrow-forward" />
        </Button>
      </ButtonGroup>
    </article>

    <!--  -->
    <article style="margin-left: -6px;">
      <Button type="success" long>SUBMIT</Button>
      <Button type="error" long>DELETE</Button>
    </article>

    <!--  -->
    <article>
      <Button>Default</Button>
      <Button disabled>Default(Disabled)</Button>
      <br />
      <Button type="primary">primary</Button>
      <Button type="primary" disabled>primary(Disabled)</Button>
      <br />
      <Button type="dashed">dashed</Button>
      <Button type="dashed" disabled>dashed(Disabled)</Button>
      <br />
      <Button type="text">text</Button>
      <Button type="text" disabled>text(Disabled)</Button>
    </article>

    <!--  -->
    <article>
      <Button type="primary" loading>Loading…</Button>
      <Button type="primary" :loading="loading" @click="loading = true">
        <span v-if="!loading">Click me!</span>
        <span v-else>Loading…</span>
      </Button>
      <Button type="primary" :loading="loading2" @click="loading2 = true" icon="ios-power">
        <span v-if="!loading2">Click me!</span>
        <span v-else>Loading…</span>
      </Button>
      <Button loading shape="circle"></Button>
      <Button loading shape="circle" type="primary"></Button>
    </article>


  </div>
</template>

<script>
export default {
  name: 'button',
  data () {
    return {
      buttonSize: 'default',
      loading: false,
      loading2: false,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  article {
    padding: 20px 0;
    box-sizing: border-box;
    width: 100%;
  }
  article > * {
    margin: 6px;
  }
</style>
