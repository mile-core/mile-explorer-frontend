<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  props: {
    firstId: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      done: false,
      blocks: [],
    };
  },
  async created() {
    this.blocks = await api.getBlockHistory(this.firstId, this.limit);
    this.done = true;
  },
  render(h) {
    if (!this.done) return h(MileLoader);
    return this.$scopedSlots.default({
      blocks: this.blocks,
    });
  },
};
</script>
