# g2v

Vue component wrapper for [@antv/g2](https://github.com/antvis/g2).  

<a href="https://www.npmjs.com/package/g2v"><img alt="NPM Package" src="https://img.shields.io/npm/v/g2v.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/g2v"><img src="https://img.shields.io/bundlejs/size/g2v"></a>
<a href="https://www.npmjs.com/package/g2v"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/g2v?logo=npm&style=flat-square"></a>
<a href="/LICENSE"><img src="https://img.shields.io/github/license/lloydzhou/g2v?style=flat-square" alt="MIT License"></a>


## demo
```
<template>
  <Chart :width="640" :height="480">
    <SpaceLayer>
      <FetchData value="https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv" format="csv" />
      <Interval>
        <Title title="test title" align="center" />
        <Encode name="x" value="letter" />
        <Encode name="y" value="frequency" />
        <FieldEncode name="color" value="letter" />
        <SortX :reverse="true" by="y" />
      </Interval>
      <Interval :x="300" :y="65" :width="300" :height="300" :legend="false">
        <FieldEncode name="y" value="frequency" />
        <Encode name="color" value="letter" />
        <StackY />
        <ThetaCoordinate />
      </Interval>
    </SpaceLayer>
  </Chart>
</template>
```

![image](https://github.com/lloydzhou/antv-g2-react/assets/1826685/759ca66d-6d1b-428b-a651-172db3147dbb)

