export default function daAlgorithm(man_pref_list, woman_pref_list, man_proposing) {
    let tmp_application;
    let proposer_stack;
    let proposer_pref_queue;
    let proposee_pref_list;

    if (man_proposing) {
        tmp_application = woman_pref_list.map((key) => Array(0));
        proposer_stack = man_pref_list.map((key, idx) => idx);
        proposer_pref_queue = man_pref_list.map((pref_list) => {
            let list = [];
            for (let i = pref_list.length-1; i >= 0; i--) {
                list.push(pref_list[i]);
            }
            return list;
        });
        proposee_pref_list = woman_pref_list;
    } else {
        tmp_application = man_pref_list.map((key) => Array(0));
        proposer_stack = woman_pref_list.map((key, idx) => idx);
        proposer_pref_queue = woman_pref_list.map((pref_list) => {
            let list = [];
            for (let i = pref_list.length-1; i >= 0; i--) {
                list.push(pref_list[i]);
            }
            return list;
        });
        proposee_pref_list = man_pref_list;
    }

    while (proposer_stack.length > 0) {
        while (proposer_stack.length > 0) {
            let proposer = proposer_stack.pop();
            if (proposer_pref_queue[proposer].length == 0) continue;
            let proposee = proposer_pref_queue[proposer].pop();
            tmp_application[proposee].push(proposer);
        }
        for (let i = 0; i < tmp_application.length; i++) {
            if (tmp_application[i].length == 0) continue;
            let min_proposer = -1;
            let min_idx = 1e+9;
            for (let proposer of tmp_application[i]) {
                if (proposee_pref_list[i].includes(proposer)) {
                    let new_idx = proposee_pref_list[i].indexOf(proposer);
                    if (new_idx < min_idx) {
                        min_idx = new_idx;
                        min_proposer = proposer;
                    }
                }
            }
            for (let proposer of tmp_application[i]) {
                if (proposer != min_proposer) {
                    proposer_stack.push(proposer);
                }
            }
            if (min_proposer == -1) {
                tmp_application[i] = [];
            } else {
                tmp_application[i] = [min_proposer];
            }
        }
    }

    const result = [];
    for (let i = 0; i < tmp_application.length; i++) {
        if (tmp_application[i].length > 0) {
            if (man_proposing) {
                result.push([tmp_application[i][0], i]);
            } else {
                result.push([i, tmp_application[i][0]]);
            }
        }
    }
    result.sort();

    return result;
}
