// @ts-nocheck
import { defineComponent, onMounted, onUnmounted, shallowRef, shallowReactive, h, Fragment, provide, cloneVNode, watchEffect, watch, nextTick } from 'vue'
import { Chart as G2Chart } from '@antv/g2';
import { debounce } from '@antv/util';
import type {
  Data,
  ViewComposition, GeoViewComposition, GeoPathComposition, SpaceLayerComposition, SpaceFlexComposition, FacetContext, FacetRectComposition, RepeatMatrixComposition, FacetCircleComposition, 
  IntervalMark, RectMark, LineMark, PointMark, TextMark, CellMark, AreaMark, NodeMark, EdgeMark, LinkMark, ImageMark, PolygonMark, BoxMark, VectorMark, LineXMark, LineYMark, RangeMark, RangeXMark, RangeYMark, ConnectorMark, SankeyMark, PathMark, TreemapMark, PackMark, BoxPlotMark, ShapeMark, ForceGraphMark, TreeMark, WordCloudMark, DensityMark, CustomMark,
  ConstantEncode, FieldEncode, ColumnEncode, TransformEncode, CustomEncode,
  StackYTransform, DodgeXTransform, NormalizeYTransform, StackEnterTransform, JitterTransform, JitterXTransform, SymmetryYTransform, DiffYTransform, SelectTransform, SelectXTransform, SelectYTransform, GroupXTransform, GroupYTransform, GroupColorTransform, SortXTransform, SortYTransform, SortColorTransform, GroupTransform, PackTransform, BinXTransform, BinTransform, SampleTransform, FlexXTransform, FilterTransform,
  TitleComponent, AxisComponent, LegendComponent, ScrollbarComponent, SliderComponent, TooltipComponent,
  PolarCoordinate, HelixCoordinate, ThetaCoordinate, CustomCoordinate, CartesianCoordinate, Cartesian3DCoordinate, ParallelCoordinate, RadialCoordinate, RadarCoordinate, GeoCoordinate,
} from '@antv/g2'
import { processProps } from './utils'


const upper = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

export const isChildrenLikeKey = key => ['children', 'transform', 'legends', 'labels'].includes(key)
export const isEncodeLikeKey = key => ['encode', 'axis'].includes(key)


export function createComponent<T>(t='view', displayName='', key='children') {
  return defineComponent({
    inheritAttrs: false,
    name: displayName || upper(t),
    key,
    setup(props, { attrs, slots, expose }) {
      const { type=t, ...other } = attrs
      const childrenRefs = shallowRef({})
      const encodeRefs = shallowRef({})
      const attributeRefs = shallowRef({})
      const options = () => {
        const attrs = Object.entries(attributeRefs.value).reduce((s, [k, child]) => {
          const o = child && child.value ? child.value.options() : undefined
          return { ...s, [k]: o }
        }, {})
        const childrens = Object.values(childrenRefs.value).reduce((s, [k, child]) => {
          const o = child && child.value ? child.value.options() : undefined
          if (o) {
            return { ...s, [k]: (s[k] || []).concat(o) }
          }
          return s
        }, {})
        const encodes = Object.values(encodeRefs.value).reduce((s, [k, child]) => {
          const o = child && child.value ? child.value.options() : undefined
          return o && o.name && o.value ? {...s, [k]: { ...(s[k] || {}), [o.name]: o.value } } : s
        }, {})
        return { type, ...other, ...attrs, ...childrens, ...encodes }
      }
      expose({ options, key })
      const processChildren = (childrens) => {
        return childrens.map((child, index) => {
          const { key: ck, props={}, type: ct } = child
          const { type: t = ct.key, children, ref: _ref } = props || {}
          const key = ck || ct.key
          const r = _ref || shallowRef()
          if (isChildrenLikeKey(key)) {
            childrenRefs.value[index] = [key, r];
          } else if (isEncodeLikeKey(key)) {
            encodeRefs.value[index] = [key, r];
          } else {
            attributeRefs.value[key] = r;
          }
          return cloneVNode(child, {
            key: ck || index,
            ref: r,
          })
        })
      }
      return () => {
        const value = slots.default && slots.default() || []
        const children = processChildren(value)
        return h(Fragment, {key}, children)
      }
    }
  }) as DefineComponent<T, {[key: string]: any}>
}


export const View = createComponent<ViewComposition>('view')
export const GeoView = createComponent<GeoViewComposition>('geoView')
export const GeoPath = createComponent<GeoPathComposition>('geoPath')
export const SpaceLayer = createComponent<SpaceLayerComposition>('spaceLayer')
export const SpaceFlex = createComponent<SpaceFlexComposition>('spaceFlex')
export const FacetRect = createComponent<FacetRectComposition>('facetRect')
export const RepeatMatrix = createComponent<RepeatMatrixComposition>('repeatMatrix')
export const FacetCircle = createComponent<FacetCircleComposition>('facetCircle')
export const TimingKeyframe = createComponent<TimingKeyframeComposition>('timingKeyframe')

export const InlineData = createComponent<Data>('inline', 'Data', 'data')
export const FetchData = createComponent<Data>('fetch', 'Data', 'data')
export const Data = InlineData

export const Interval = createComponent<IntervalMark>('interval')
export const Rect = createComponent<RectMark>('rect')
export const Line = createComponent<LineMark>('line')
export const Point = createComponent<PointMark>('point')
export const Text = createComponent<TextMark>('text')
export const LineX = createComponent<LineXMark>('lineX')
export const LineY = createComponent<LineYMark>('lineY')
export const Range = createComponent<RangeMark>('range')
export const RangeX = createComponent<RangeXMark>('rangeX')
export const RangeY = createComponent<RangeYMark>('rangeY')
export const Connector = createComponent<ConnectorMark>('connector')
export const Cell = createComponent<CellMark>('cell')
export const Area = createComponent<AreaMark>('area')
export const Node = createComponent<NodeMark>('node')
export const Edge = createComponent<EdgeMark>('edge')
export const Link = createComponent<LinkMark>('link')
export const Image = createComponent<ImageMark>('image')
export const Polygon = createComponent<PolygonMark>('polygon')
export const Box = createComponent<BoxMark>('box')
export const BoxPlot = createComponent<BoxPlotMark>('boxplot')
export const Shape = createComponent<ShapeMark>('shape')
export const Vector = createComponent<VectorMark>('vector')
export const Sankey = createComponent<SankeyMark>('sankey')
export const Path = createComponent<PathMark>('path')
export const Treemap = createComponent<TreemapMark>('treemap')
export const Pack = createComponent<PackMark>('pack')
export const ForceGraph = createComponent<ForceGraphMark>('forceGraph')
export const Tree = createComponent<TreeMark>('tree')
export const WordCloud = createComponent<WordCloudMark>('wordCloud')
export const Gauge = createComponent<GaugeMark>('gauge')
export const Density = createComponent<DensityMark>('density')
export const Heatmap = createComponent<HeatmapMark>('heatmap')
export const Liquid = createComponent<LiquidMark>('liquid')
export const Custom = createComponent<CustomMark>('custom')

export const ConstantEncode = createComponent<ConstantEncode>('constant', 'ConstantEncode', 'encode')
export const FieldEncode = createComponent<FieldEncode>('field', 'FieldEncode', 'encode')
export const Encode = FieldEncode
export const ColumnEncode = createComponent<ColumnEncode>('column', 'ColumnEncode', 'encode')
export const TransformEncode = createComponent<TransformEncode>('transform', 'TransformEncode', 'encode')
export const CustomEncode = createComponent<CustomEncode>('custom', 'CustomEncode', 'encode')

export const DodgeX = createComponent<DodgeXTransform>('dodgeX', '', 'transform')
export const StackY = createComponent<StackYTransform>('stackY', '', 'transform')
export const NormalizeY = createComponent<NormalizeYTransform>('normalizeY', '', 'transform')
export const Jitter = createComponent<JitterTransform>('jitter', '', 'transform')
export const JitterX = createComponent<JitterTransform>('jitterX', '', 'transform')
export const StackEnter = createComponent<StackEnterTransform>('stackEnter', '', 'transform')
export const SymmetryY = createComponent<SymmetryYTransform>('symmetryY', '', 'transform')
export const DiffY = createComponent<DiffYTransform>('diffY', '', 'transform')
export const Select = createComponent<SelectTransform>('select', '', 'transform')
export const SelectX = createComponent<SelectXTransform>('selectX', '', 'transform')
export const SelectY = createComponent<SelectYTransform>('selectY', '', 'transform')
export const SortColor = createComponent<SortColorTransform>('sortColor', '', 'transform')
export const SortX = createComponent<SortXTransform>('sortX', '', 'transform')
export const SortY = createComponent<SortYTransform>('sortY', '', 'transform')
export const FlexX = createComponent<FlexXTransform>('flexX', '', 'transform')
export const PackTransform = createComponent<PackTransform>('pack', '', 'transform')
export const GroupX = createComponent<GroupXTransform>('groupX', '', 'transform')
export const GroupY = createComponent<GroupYTransform>('groupY', '', 'transform')
export const GroupColor = createComponent<GroupColorTransform>('groupColor', '', 'transform')
export const Group = createComponent<GroupTransform>('group', '', 'transform')
export const BinX = createComponent<BinXTransform>('binX', '', 'transform')
export const Bin = createComponent<BinTransform>('bin', '', 'transform')
export const SampleTransform = createComponent<SampleTransform>('sample', '', 'transform')
export const Sample = SampleTransform
export const Filter = createComponent<FilterTransform>('filter', '', 'transform')

export const AxisX = createComponent<AxisComponent>('axisX', '', 'axis')
export const AxisY = createComponent<AxisComponent>('axisY', '', 'axis')
export const AxisZ = createComponent<AxisComponent>('axisZ', '', 'axis')
export const Title = createComponent<TitleComponent>('title', '', 'title')
export const Legend = createComponent<LegendComponent>('legends', '', 'legends')
// TODO SliderComponent, ScrollbarComponent, TooltipComponent

export const PolarCoordinate = createComponent<PolarCoordinate>('polar', '', 'coordinate')
export const HelixCoordinate = createComponent<HelixCoordinate>('helix', '', 'coordinate')
export const RadarCoordinate = createComponent<RadarCoordinate>('radar', '', 'coordinate')
export const ThetaCoordinate = createComponent<ThetaCoordinate>('theta', '', 'coordinate')
export const RadialCoordinate = createComponent<RadialCoordinate>('radial', '', 'coordinate')
export const CartesianCoordinate = createComponent<CartesianCoordinate>('cartesian', '', 'coordinate')
export const Cartesian3DCoordinate = createComponent<Cartesian3DCoordinate>('cartesian3D', '', 'coordinate')
export const ParallelCoordinate = createComponent<ParallelCoordinate>('parallel', '', 'coordinate')
export const GeoCoordinate = createComponent<GeoCoordinate>('geo', '', 'coordinate')

export const contextSymbol = String(Symbol('g2ContextSymbol'))

export const Chart = defineComponent({
  name: 'Chart',
  setup(props, { attrs, slots, expose }) {
    const { className='', onRendered, width=600, height=300, style={}, ...other } = attrs
    const container = shallowRef<HTMLDivElement>();
    const viewRef = shallowRef();
    const context = shallowReactive({ chart: null })
    provide(contextSymbol, context)
    expose(context)

    onMounted(() => {
      const instance = new G2Chart({
        container: container.value as HTMLDivElement,
        width,
        height,
      })
      context.chart = instance
    })
    onUnmounted(() => {
      context.chart.destroy()
    })

    const update = debounce(() => {
      const { options, events } = processProps(other)
      const { chart } = context
      if (chart && viewRef.value) {
        Object.entries(events).forEach(([n, f]) => chart.off(n, f))
        // add event
        Object.entries(events).forEach(([n, f]) => chart.on(n, f))
        // console.log('watchEffect', options, chart, viewRef, viewRef.value.options())
        chart.options({ ...options, ...viewRef.value.options() })
        chart.render()
      }
    })
    const children = shallowRef()
    watch(() => [context.chart, viewRef.value, children.value], update)
    return () => {
      const value = slots.default && slots.default() || []
      children.value = value
        ? value.length == 1
          ? cloneVNode(value[0], {ref: viewRef})
          : h(View, {ref: viewRef}, value)
        : null
      return h('div', {
        ref: container,
        class: `antv-g2-chart ${className}`,
        style: `display: block;width: 100%;height: 100%;${style}`
      }, children.value)
    }
  }
})

