<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  data() {
    return {
      done: false,
      count: null,
      firstId: null,
    };
  },
  async created() {
    const { count, 'first-id': firstId } = await api.getBlockHistoryState();
    this.count = count;
    this.firstId = firstId;
    this.done = true;
  },
  render(h) {
    if (!this.done) return h(MileLoader);
    return this.$scopedSlots.default({
      count: this.count,
      firstId: this.firstId,
      done: this.done,
    });
  },
};
</script>

