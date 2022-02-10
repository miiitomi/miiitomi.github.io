import React from "react";

export default class Result extends React.Component {
    render() {

        const match_list = this.props.matching.map((pair, idx) => {
            return (
                <li key={"match_pair_" + idx}>{this.props.man_name_list[pair[0]]}さん ❤️ {this.props.woman_name_list[pair[1]]}さん</li>
            );
        });

        return (
            <>
            {
                this.props.matching.length == 0 &&
                <p>今回はマッチが成立しませんでした。</p>
            }{
                this.props.matching.length > 0 &&
                <>
                    <p>{this.props.matching.length} 件のマッチが成立しました！おめでとうございます！</p>
                    <ul>
                        { match_list }
                    </ul>
                </>
            }
            </>
        );
    }
}
