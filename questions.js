// AWS Certified Data Engineer - Associate (DEA-C01) v1.1
// バンク1 改良版：全65問（基礎・中核）
// 公式ドメイン配分に合わせて構成：
// Domain 1 データ取り込み・変換 22問 / Domain 2 データストア管理 17問 /
// Domain 3 データ運用・サポート 14問 / Domain 4 データセキュリティ・ガバナンス 12問
// 複数選択：10問（すべて5択）／単一選択：すべて4択
var QUESTIONS = [
  {
    "id": 1,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "Kinesis Data Streams",
      "オンデマンド",
      "シャード"
    ],
    "scenario": "店舗アプリの購買イベントは平常時毎秒数百件ですが、予告なく毎秒数万件まで急増します。保持、順序、複数コンシューマー、リプレイは必要です。ピークに合わせた固定シャードや手動スケーリングは避けます。",
    "ask": "最も運用負荷が低い構成はどれですか。",
    "options": [
      "Kinesis Data Streamsをオンデマンドキャパシティモードで使用する。",
      "Amazon Data Firehoseだけを使用し、複数コンシューマーが任意位置から再生する。",
      "SQS FIFOキューを共有し、同じメッセージを複数処理が独立して読む。",
      "Kinesis Data Streamsを最大ピークに合わせた固定シャード数で常時運用する。"
    ],
    "answer": 0,
    "keypoint": "予測困難な増減とData Streamsの保持・再生要件が決め手。",
    "explain": "オンデマンドモードは事前のシャード設計を減らし、トラフィックに応じて容量を調整する。",
    "elim": "固定容量は過剰コストになりやすい。FirehoseとSQSはData Streamsの独立コンシューマーとリプレイを同じ形では提供しない。",
    "origCat": "取り込み・ストリーミング"
  },
  {
    "id": 2,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "Amazon Data Firehose",
      "S3",
      "Parquet",
      "動的パーティション"
    ],
    "scenario": "JSONログを数分以内にS3へ蓄積し、保存時にParquet変換、圧縮、顧客IDと日付によるプレフィックス分割を行います。独立コンシューマーやリプレイは不要です。",
    "ask": "最も運用負荷が低い構成はどれですか。",
    "options": [
      "Amazon MSKとセルフマネージドKafka ConnectでS3へ出力する。",
      "Amazon Data Firehoseで形式変換、圧縮、動的パーティショニングを設定してS3へ配信する。",
      "S3到着後に各JSONファイルごとにLambdaを起動してParquetへ変換する。",
      "Kinesis Data StreamsとEC2上のKCLアプリで変換してS3へ書き出す。"
    ],
    "answer": 1,
    "keypoint": "保持や独自コンシューマー不要で、S3へのマネージド配信が目的。",
    "explain": "Firehoseはバッファ、変換、圧縮、動的パーティショニングを行いS3などへ配信できる。",
    "elim": "Data StreamsやMSKはより柔軟だが運用が増える。ファイル単位Lambdaは小さいファイルと大量起動を招きやすい。",
    "origCat": "取り込み・配信"
  },
  {
    "id": 3,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "Amazon MSK",
      "Apache Kafka",
      "互換性"
    ],
    "scenario": "オンプレミスKafkaで多数のプロデューサー、コンシューマー、Kafka Connect、独自パーティション設計を使用しています。AWS移行後もKafka APIと既存資産を大きく変更したくありません。",
    "ask": "最も適切な移行先はどれですか。",
    "options": [
      "FirehoseをKafkaブローカーとして使用し、保持とコンシューマーグループを利用する。",
      "SQSへ移行し、Kafkaのトピックとコンシューマーグループを同じ設定で再現する。",
      "Kinesis Data Streamsへ移行し、Kafka APIクライアントを無変更で接続する。",
      "Amazon MSKを使用し、既存Kafkaクライアントとコネクタを継続利用する。"
    ],
    "answer": 3,
    "keypoint": "Kafka互換性と既存資産の維持が最優先。",
    "explain": "Amazon MSKはApache Kafka互換のマネージドサービスで、既存APIやツールを活用できる。",
    "elim": "他の選択肢は有力なAWSサービスだがKafka API互換の置き換えではない。",
    "origCat": "取り込み・Kafka"
  },
  {
    "id": 4,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "AWS DMS",
      "CDC",
      "フルロード",
      "S3"
    ],
    "scenario": "オンプレミスOracleの20TB履歴をS3へ移行し、その後もINSERT、UPDATE、DELETEを継続反映します。停止時間と独自ログ解析の実装を最小化します。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "DataSyncでOracleデータファイルを同期し、論理レコード変更を反映する。",
      "AWS DMSでフルロードとCDCを構成し、S3をターゲットにする。",
      "AppFlowでOracleトランザクションログを読み、CDCをS3へ送る。",
      "Glueクローラーで変更行を検出してS3へ複製する。"
    ],
    "answer": 1,
    "keypoint": "DBの初回移行とログベースCDCを一体で行う要件。",
    "explain": "AWS DMSはフルロード後にトランザクションログを読み、継続的な変更をターゲットへ反映できる。",
    "elim": "DataSyncはファイル転送、AppFlowは主にSaaS連携、クローラーはメタデータ検出である。",
    "origCat": "取り込み・CDC"
  },
  {
    "id": 5,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "Amazon AppFlow",
      "Salesforce",
      "増分転送"
    ],
    "scenario": "Salesforceの商談データを毎晩S3へ取り込みます。OAuth、ページング、フィールドマッピング、増分取得を自前実装せず、運用担当者が設定を変更できることを重視します。",
    "ask": "最も適切なサービスはどれですか。",
    "options": [
      "FirehoseがSalesforce APIを定期的にプルするよう設定する。",
      "API GatewayだけでSalesforceのページングと増分状態を管理する。",
      "Amazon AppFlowのSalesforceコネクタでスケジュール、増分転送、マッピングを設定する。",
      "GlueクローラーでSalesforceのレコード本体をS3へ転送する。"
    ],
    "answer": 2,
    "keypoint": "主要SaaSからマネージドに転送する要件。",
    "explain": "AppFlowはSaaSコネクタ、認証、マッピング、増分転送を提供する。",
    "elim": "API Gateway、クローラー、FirehoseはSaaS定期抽出を同じ形で提供しない。",
    "origCat": "取り込み・SaaS"
  },
  {
    "id": 6,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "S3",
      "EventBridge",
      "Step Functions"
    ],
    "scenario": "取引先が不定期にS3へファイルを置きます。特定プレフィックスと拡張子だけを対象に、検証・変換ワークフローを到着直後に開始し、ポーリングは避けます。",
    "ask": "必要な構成要素を2つ選んでください。",
    "options": [
      "Lambdaで1分ごとにListObjectsを実行する。",
      "Glueクローラーを毎時実行して新規ファイルを検出する。",
      "S3オブジェクト作成イベントをEventBridgeへ送り、イベントパターンで対象を絞る。",
      "EventBridgeルールのターゲットにStep Functionsを指定する。",
      "S3 Inventoryの日次レポートで新規ファイルを探す。"
    ],
    "answer": [
      2,
      3
    ],
    "keypoint": "到着イベントの受信とワークフロー起動を組み合わせる。",
    "explain": "S3イベントをEventBridgeでフィルタし、Step Functionsを起動すればイベント駆動になる。",
    "elim": "周期実行、Inventory、クローラーでは遅延と空振りが残る。",
    "origCat": "イベント駆動"
  },
  {
    "id": 7,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "Lambda",
      "Kinesis",
      "部分バッチ応答"
    ],
    "scenario": "KinesisからLambdaへ100件ずつ渡します。1件の形式不正で正常な99件も繰り返し再処理されます。失敗位置以降だけを効率的に再試行する必要があります。",
    "ask": "最も適切な設定はどれですか。",
    "options": [
      "Kinesis保持期間を延長し、成功レコードをストリームから削除する。",
      "バッチ全体をFirehoseへ移して毎回再変換する。",
      "予約済み同時実行を1にして失敗レコードを自動スキップする。",
      "イベントソースマッピングで部分バッチ応答を有効にし、失敗したシーケンス番号を返す。"
    ],
    "answer": 3,
    "keypoint": "一部レコードだけ失敗するKinesis→Lambda処理。",
    "explain": "部分バッチ応答は失敗位置を通知し、成功済みレコードを含む全体再実行を減らす。",
    "elim": "同時実行や保持期間は失敗範囲を変えない。Kinesisは成功レコードを削除する方式ではない。",
    "origCat": "Lambda・ストリーミング"
  },
  {
    "id": 8,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "Kinesis",
      "Enhanced Fan-Out",
      "コンシューマー"
    ],
    "scenario": "1つのKinesisストリームを不正検知、ダッシュボード、検索更新の3処理が読みます。共有読み取り帯域を奪い合うため、各処理へ専用帯域と低レイテンシ配信を与えます。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "各コンシューマーをEnhanced Fan-Outに登録する。",
      "保持期間を延長して読み取り帯域を増やす。",
      "Firehoseの同一配信ストリームへ3つの独立宛先を設定する。",
      "3処理で同じSQSキューを共有する。"
    ],
    "answer": 0,
    "keypoint": "複数コンシューマーの読み取り競合と低レイテンシ。",
    "explain": "Enhanced Fan-Outは登録コンシューマーごとに専用読み取りスループットを提供する。",
    "elim": "SQS共有は1対多の同一イベント配信ではない。保持期間は帯域を増やさない。",
    "origCat": "ストリーミング・ファンアウト"
  },
  {
    "id": 9,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "Kinesis",
      "保持期間",
      "チェックポイント"
    ],
    "scenario": "新しい特徴量生成処理を追加し、過去3日分のイベントから状態を再構築します。既存処理を止めず、新処理だけが過去位置から読み始める必要があります。",
    "ask": "最も適切な設計はどれですか。",
    "options": [
      "SQSの可視性タイムアウトを3日にして処理済みメッセージを再配信する。",
      "Firehoseのバッファ間隔を3日に設定する。",
      "Kinesis Data Streamsの保持期間を3日以上にし、新コンシューマーを過去位置から読ませる。",
      "SNSが新規サブスクライバーへ過去3日を再送するよう設定する。"
    ],
    "answer": 2,
    "keypoint": "独立した読み取り位置と保持期間内の再生。",
    "explain": "Kinesis Data Streamsはコンシューマーごとに独立した位置から保持データを読める。",
    "elim": "SQS、SNS、Firehoseは同じストリーム再生モデルではない。",
    "origCat": "取り込み・リプレイ"
  },
  {
    "id": 10,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "Managed Service for Apache Flink",
      "状態",
      "チェックポイント"
    ],
    "scenario": "デバイスごとの直近10分の移動平均を継続計算します。障害やアプリ更新後も、処理位置と集計状態を復元する必要があります。",
    "ask": "重要な構成を2つ選んでください。",
    "options": [
      "Managed Service for Apache Flinkでキー付き状態とイベント時間ウィンドウを実装する。",
      "Lambdaのグローバル変数へ10分間の状態を保持する。",
      "Athenaの定期クエリで実行間のメモリ状態を継承する。",
      "FirehoseのS3バックアップからFlinkのメモリ状態を自動復元する。",
      "Flinkのチェックポイントとスナップショットを有効にする。"
    ],
    "answer": [
      0,
      4
    ],
    "keypoint": "状態付き処理と障害復旧用の永続チェックポイント。",
    "explain": "Flinkは状態付きストリーム処理を行い、チェックポイントで状態と読み取り位置を復元できる。",
    "elim": "Firehoseバックアップ、Lambdaメモリ、AthenaはFlinkの永続状態管理の代替ではない。",
    "origCat": "状態付きストリーム処理"
  },
  {
    "id": 11,
    "cat": "変換・ETL",
    "cards": [
      "AWS Glue",
      "Job Bookmarks",
      "S3"
    ],
    "scenario": "毎日S3へ追加されるファイルをGlueで処理します。前回までに正常処理した入力を記録し、新規ファイルだけを対象にして重複を防ぎます。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "Glueジョブブックマークを有効にする。",
      "Athena結果再利用でGlueの入力読み取りを省略する。",
      "Glueクローラーでカタログ登録済みファイルを処理対象外にする。",
      "S3バージョニングで最新バージョンだけを新規入力と判定する。"
    ],
    "answer": 0,
    "keypoint": "Glueの増分入力追跡はジョブブックマーク。",
    "explain": "ジョブブックマークは処理済み入力の状態を保持し、増分処理に利用できる。",
    "elim": "バージョニング、クローラー、Athenaキャッシュは処理済み入力管理ではない。",
    "origCat": "Glue・増分処理"
  },
  {
    "id": 12,
    "cat": "変換・ETL",
    "cards": [
      "Pushdown Predicate",
      "パーティション",
      "S3"
    ],
    "scenario": "S3売上データはyear、month、dayでパーティション化されています。Glueジョブは直近1日だけ必要ですが、現在は全ファイルを読み込んだ後でフィルタしています。",
    "ask": "最も効果的な改善はどれですか。",
    "options": [
      "S3 Intelligent-Tieringで読み取るファイル数を減らす。",
      "毎回クローラーで全パーティションを再スキャンする。",
      "読み取り時にpushdown predicateを指定し、対象パーティションだけを読む。",
      "ワーカーを増やし、不要パーティションも読み込んでからフィルタする。"
    ],
    "answer": 2,
    "keypoint": "読み込み前に対象パーティションを絞る。",
    "explain": "Pushdown predicateは不要なI/O、実行時間、DPU消費を減らす。",
    "elim": "ワーカー追加は無駄な読み取りを残す。ストレージクラスやクローラー頻度は対象ファイルを直接絞らない。",
    "origCat": "Glue・性能最適化"
  },
  {
    "id": 13,
    "cat": "変換・ETL",
    "cards": [
      "Glue Auto Scaling",
      "Flex execution",
      "DPU"
    ],
    "scenario": "夜間ETLの入力量は日ごとに大きく変わり、完了時刻には数時間の余裕があります。ピークに合わせた最大DPUを常時確保せず、コストを抑えます。",
    "ask": "最も適切な構成はどれですか。",
    "options": [
      "Glue Auto Scalingを有効にし、時間に余裕のあるジョブへFlex execution classを使用する。",
      "最大規模EMRクラスターを常時稼働させる。",
      "最大ワーカー数を固定し、Standard executionで常時即時開始する。",
      "処理を複数の短時間Lambda関数へ分割し、一時ストレージで中間データを受け渡す。"
    ],
    "answer": 0,
    "keypoint": "入力変動はAuto Scaling、時間柔軟性はFlex。",
    "explain": "必要な容量だけを使い、開始時間に柔軟なバッチではFlexでコストを抑えられる。",
    "elim": "固定最大容量と常時EMRはアイドルコストが大きい。Lambdaへの機械的分割はSpark ETLの代替ではない。",
    "origCat": "Glue・コスト最適化"
  },
  {
    "id": 14,
    "cat": "変換・ETL",
    "cards": [
      "AWS Glue",
      "EMR Serverless",
      "Spark"
    ],
    "scenario": "既存の複雑なPySparkアプリは独自ライブラリとSpark設定を必要とします。一方、別の単純ETLはGlue Data Catalogとマネージドコネクタを重視します。クラスター常時管理は避けます。",
    "ask": "適切なサービス選択を2つ選んでください。",
    "options": [
      "独自SparkライブラリをAthena SQLへインストールして実行する。",
      "両方をFirehoseのLambda変換だけで実装する。",
      "統合型の単純ETLにはAWS Glueを使用する。",
      "単純ETLのためにEC2 Hadoopを常時稼働する。",
      "複雑な既存PySparkアプリにはEMR Serverlessを使用する。"
    ],
    "answer": [
      2,
      4
    ],
    "keypoint": "既存Sparkの柔軟性と、統合型ETLを使い分ける。",
    "explain": "EMR ServerlessはSparkの柔軟性を保ち、GlueはCatalogやコネクタと統合されたETLに向く。",
    "elim": "Firehose、Athena、常時Hadoopは各要件に過不足がある。",
    "origCat": "変換基盤の選択"
  },
  {
    "id": 15,
    "cat": "変換・ETL",
    "cards": [
      "Parquet",
      "CSV",
      "Athena",
      "圧縮"
    ],
    "scenario": "CSVアクセスログをAthenaで分析しています。数列だけを参照するクエリでも全列をスキャンし、コストと解析時間が増えています。",
    "ask": "最も効果的な改善はどれですか。",
    "options": [
      "すべてをJSON文字列型へ変換する。",
      "CSVを1つのZIPへまとめ、AthenaがZIP内の必要列だけを読むようにする。",
      "圧縮Parquetへ変換し、主要条件に合うキーでパーティション化する。",
      "列名を短くして同じCSVのまま保存する。"
    ],
    "answer": 2,
    "keypoint": "列指向形式、圧縮、パーティション。",
    "explain": "Parquetは必要列だけを読みやすく、圧縮とパーティションでスキャン量を減らせる。",
    "elim": "ZIP、列名短縮、JSON化は列プルーニングを実現しない。",
    "origCat": "形式変換"
  },
  {
    "id": 16,
    "cat": "運用・オーケストレーション",
    "cards": [
      "予約済み同時実行",
      "プロビジョンド同時実行",
      "スロットリング"
    ],
    "scenario": "大量ファイル到着時に1つのLambdaがアカウント同時実行枠を使い切り、重要な別関数がスロットリングされます。問題の関数へ上限を設け、その関数用の枠も確保します。",
    "ask": "最も適切な設定はどれですか。",
    "options": [
      "問題の関数へ予約済み同時実行を設定する。",
      "S3イベントの再試行回数で同時実行枠を分離する。",
      "関数メモリ量で最大同時実行数を制御する。",
      "プロビジョンド同時実行だけを設定し、最大同時実行数も自動制限する。"
    ],
    "answer": 0,
    "keypoint": "枠の確保と上限設定は予約済み同時実行。",
    "explain": "予約済み同時実行は対象関数のための枠を確保し、その関数の最大値としても機能する。",
    "elim": "プロビジョンド同時実行は主にコールドスタート対策。メモリや再試行設定は枠を分離しない。",
    "origCat": "Lambda・同時実行"
  },
  {
    "id": 17,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "SQS",
      "レート制限",
      "バックプレッシャー"
    ],
    "scenario": "外部APIは毎秒100リクエストまでですが、社内から短時間に数万件の要求が来ます。要求を失わず、下流上限を超えない速度で非同期処理します。",
    "ask": "最も適切な設計はどれですか。",
    "options": [
      "要求をSQSへ保存し、同時実行数を制御したワーカーで外部APIを呼ぶ。",
      "同期転送し、429時はクライアントへ全件即時再送させる。",
      "Kinesisのシャード数を最大化して外部API呼び出しを並列化する。",
      "SNSから全要求を同時にHTTPプッシュする。"
    ],
    "answer": 0,
    "keypoint": "バーストをキューで吸収し、ワーカー側で流量制御。",
    "explain": "SQSが耐久的バッファとなり、ワーカーの同時実行数で下流レートに合わせられる。",
    "elim": "同期再送、最大並列化、無制限プッシュはレート制限を悪化させる。",
    "origCat": "API取り込み・流量制御"
  },
  {
    "id": 18,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "NAT Gateway",
      "Elastic IP",
      "Glue",
      "allowlist"
    ],
    "scenario": "取引先SFTPは登録済みの単一パブリックIPだけを許可します。Glueジョブはプライベートサブネットで実行し、外部から着信させず固定送信元IPで接続します。",
    "ask": "最も適切な構成はどれですか。",
    "options": [
      "GlueワーカーへElastic IPを直接割り当てる。",
      "取引先の専用線なしでDirect Connect Gatewayを固定送信元IPとして使う。",
      "Elastic IPを割り当てたNAT Gatewayへプライベートサブネットの経路を向ける。",
      "S3 Gateway Endpointで外部SFTPへ接続する。"
    ],
    "answer": 2,
    "keypoint": "プライベートワークロードの固定外向きIPはNAT Gateway＋EIP。",
    "explain": "NAT GatewayにEIPを割り当てると、着信を許可せず固定送信元で外部接続できる。",
    "elim": "Glueワーカーへ直接EIPは付けられず、S3 endpointやDirect Connect Gatewayも用途が異なる。",
    "origCat": "ネットワーク・取り込み"
  },
  {
    "id": 19,
    "cat": "取り込み・ストリーミング",
    "cards": [
      "JDBC",
      "Glue Connection",
      "Secrets Manager",
      "VPC"
    ],
    "scenario": "GlueからプライベートRDS PostgreSQLへ接続します。認証情報をコードへ埋め込まず、セキュリティグループで通信を制御し、安全に更新します。",
    "ask": "最も適切な構成はどれですか。",
    "options": [
      "Glue JDBC ConnectionをVPC設定と関連付け、認証情報をSecrets Managerで管理する。",
      "認証情報をSystems Manager Parameter Storeの標準パラメータへ平文で保存し、ジョブ引数で参照する。",
      "RDSのパブリックアクセスを有効にし、Secrets Managerの認証情報でインターネット経由から接続する。",
      "IAMへrds:*を付与し、ネットワーク経路とDB認証を代替する。"
    ],
    "answer": 0,
    "keypoint": "JDBC、VPC接続、秘密情報管理の組み合わせ。",
    "explain": "Glue ConnectionとSecrets Managerで、コードへ秘密情報を残さずプライベートDBへ接続できる。",
    "elim": "パブリック経由の接続はセキュリティグループによるプライベート通信の要件に反する。平文の標準パラメータは暗号化保存と安全な更新を提供しない。rds:*のIAM権限だけではネットワーク経路とDB認証は構成できない。",
    "origCat": "データソース接続"
  },
  {
    "id": 20,
    "cat": "運用・オーケストレーション",
    "cards": [
      "Step Functions",
      "Retry",
      "Catch",
      "SNS"
    ],
    "scenario": "複数LambdaとGlueジョブの一時スロットリングは指数バックオフで再試行し、規定回数後の失敗は記録して通知します。例外処理を各コードへ分散させません。",
    "ask": "最も適切な設計はどれですか。",
    "options": [
      "Step FunctionsでRetryとCatchを定義し、失敗経路から記録とSNS通知を呼ぶ。",
      "Glueクローラーの状態を全ワークフローの成否として扱う。",
      "各Lambdaで無期限while再試行し、失敗状態をメモリへ保持する。",
      "全ステップを同時刻にSchedulerで起動する。"
    ],
    "answer": 0,
    "keypoint": "再試行、例外分岐、通知をワークフローへ集約。",
    "explain": "Step Functionsは状態ごとにRetry、Catch、バックオフ、失敗経路を宣言できる。",
    "elim": "無期限再試行や同時スケジュールは依存関係と例外処理を管理しない。",
    "origCat": "オーケストレーション・耐障害性"
  },
  {
    "id": 21,
    "cat": "運用・オーケストレーション",
    "cards": [
      "Amazon MWAA",
      "Apache Airflow",
      "DAG"
    ],
    "scenario": "オンプレミスAirflowで数百のDAG、独自Operator、バックフィルを運用しています。既存DAGをできるだけ維持し、スケジューラーとWebサーバー管理を減らします。",
    "ask": "最も適切なサービスはどれですか。",
    "options": [
      "Amazon MWAAへDAGを移行する。",
      "Step FunctionsへAirflow DAGを無変更でアップロードする。",
      "EventBridge Schedulerの式だけでDAG依存関係とバックフィルを再現する。",
      "GlueクローラーへDAGを登録する。"
    ],
    "answer": 0,
    "keypoint": "既存Airflow資産の維持はMWAA。",
    "explain": "MWAAはマネージドApache Airflow環境で、DAGとエコシステムを活用できる。",
    "elim": "Step Functions、Scheduler、クローラーはAirflow DAGの無変更実行先ではない。",
    "origCat": "オーケストレーション"
  },
  {
    "id": 22,
    "cat": "運用・オーケストレーション",
    "cards": [
      "AWS SAM",
      "CloudFormation",
      "CI",
      "CD"
    ],
    "scenario": "Lambda、Step Functions、DynamoDBのパイプラインを開発・検証・本番へ同じ定義から再現します。Git管理し、プルリクエストで検証とテスト、承認後に反映します。",
    "ask": "適切な取り組みを2つ選んでください。",
    "options": [
      "CI/CDでテンプレート検証、テスト、デプロイを自動化する。",
      "SAMまたはCloudFormationでリソースと権限をコード化する。",
      "全環境で同じDynamoDBテーブルとIAMロールを共有する。",
      "リソースは手動作成し、作成後にIaCテンプレートへ逆生成して記録する。",
      "コードだけGit管理しIAMとイベントソースは本番で直接変更する。"
    ],
    "answer": [
      0,
      1
    ],
    "keypoint": "再現可能なIaCと自動検証・デプロイ。",
    "explain": "IaCとCI/CDを組み合わせると、ドリフトと手作業ミスを減らし安全に反映できる。",
    "elim": "手動作成後の逆生成やコード外の直接変更はドリフトを生み、プルリクエストでの検証も通らない。環境間のリソース共有は分離を損なう。",
    "origCat": "IaC・CI/CD"
  },
  {
    "id": 23,
    "cat": "データストア・モデリング",
    "cards": [
      "Redshift",
      "DynamoDB",
      "RDS",
      "S3"
    ],
    "scenario": "数年分の売上明細を対象に、大規模テーブル結合、集計、ウィンドウ関数、BIダッシュボードを高い同時実行性で提供します。1桁ミリ秒のキーバリューストア（KVS）アクセスではなく列指向分析が中心です。",
    "ask": "主な分析ストアとして最も適切なものはどれですか。",
    "options": [
      "DynamoDBへ格納し、任意の結合と集計をScanだけで行う。",
      "単一RDSへOLTPと数十億行分析を集約する。",
      "常設EMRクラスターのPrestoでS3のCSVを直接クエリし、BIツールから接続する。",
      "Amazon Redshiftを使用する。"
    ],
    "answer": 3,
    "keypoint": "大規模結合・集計・BIはRedshift。",
    "explain": "Redshiftは列指向MPPデータウェアハウスで大規模分析に適する。",
    "elim": "DynamoDBのScanは大規模結合・集計に不向き。単一RDSは行指向でOLTPと数十億行分析の同居に不向き。CSVへの直接Prestoクエリは列指向の恩恵がなく、クラスター常時運用も増える。",
    "origCat": "データストア選択"
  },
  {
    "id": 24,
    "cat": "データストア・モデリング",
    "cards": [
      "DynamoDB",
      "パーティションキー",
      "ホットパーティション"
    ],
    "scenario": "全項目のパーティションキーに固定値DEVICEを使い、書き込みが集中しています。主なアクセスはデバイスIDと期間を指定した履歴取得です。",
    "ask": "最も適切なキー設計はどれですか。",
    "options": [
      "秒単位時刻をパーティションキーにし、デバイス検索は全Scanする。",
      "ランダムUUIDだけをキーにし、検索用キーやインデックスを作らない。",
      "固定値DEVICEのまま容量だけ増やす。",
      "パーティションキーをデバイスID、ソートキーをイベント時刻にする。高頻度端末には時間バケットも検討する。"
    ],
    "answer": 3,
    "keypoint": "分散と主要アクセスパターンを同時に満たす。",
    "explain": "デバイスIDで分散し、時刻ソートキーで期間Queryができる。",
    "elim": "固定値はホットパーティションを残し、時刻のみ・UUIDのみはデバイス別検索を非効率にする。",
    "origCat": "DynamoDBモデリング"
  },
  {
    "id": 25,
    "cat": "データストア・モデリング",
    "cards": [
      "分散キー",
      "ソートキー",
      "再分散"
    ],
    "scenario": "Redshiftで売上ファクトと顧客ディメンションをcustomer_idで頻繁に結合し、sale_dateで範囲検索します。結合時の再分散と広いスキャンがボトルネックです。",
    "ask": "最も適切な物理設計はどれですか。",
    "options": [
      "customer_idのデータ配置を揃える分散設計と、sale_dateを先頭に含むソート設計を検討する。",
      "全テーブルをEVEN分散、ソートキーなしに固定する。",
      "全列を複合ソートキーにする。",
      "sale_dateだけを分散キーにする。"
    ],
    "answer": 0,
    "keypoint": "結合の再分散と範囲スキャンを別々に最適化。",
    "explain": "結合キーで配置を揃え、日付ソートで不要ブロックを減らせる。",
    "elim": "EVEN未ソートは問題を残す。日付分散は顧客結合に合わず、全列ソートは過剰。",
    "origCat": "Redshift物理設計"
  },
  {
    "id": 26,
    "cat": "データストア・モデリング",
    "cards": [
      "Redshift Spectrum",
      "S3",
      "外部テーブル"
    ],
    "scenario": "直近1年はRedshift、過去10年はS3のParquetです。まれに履歴と現在データを結合しますが、全履歴をRedshiftへ常時ロードするコストは避けます。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "履歴を毎回DynamoDBへ一時ロードする。",
      "履歴データをAthenaで集計し、結果をBIクライアント側でRedshiftの結果と手動結合する。",
      "Redshift SpectrumでS3外部テーブルをRedshiftローカルテーブルと結合する。",
      "全履歴をRedshiftへ重複ロードする。"
    ],
    "answer": 2,
    "keypoint": "S3履歴をロードせずRedshift SQLから参照する。",
    "explain": "SpectrumはS3外部テーブルをRedshiftのSQLから参照・結合できる。",
    "elim": "一時ロード、全量常駐、クライアント結合はコストや複雑性が高い。",
    "origCat": "Redshift・データレイク"
  },
  {
    "id": 27,
    "cat": "データストア・モデリング",
    "cards": [
      "Redshift federated query",
      "Aurora",
      "RDS"
    ],
    "scenario": "Redshift分析からAurora PostgreSQLの最新顧客属性を直接参照します。属性は頻繁に更新され、毎回ETLすると鮮度が不足します。参照量は限定的です。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "AWS DMSの継続レプリケーションでAurora属性テーブルをRedshiftへ同期する。",
      "Redshift federated queryでAuroraテーブルを外部スキーマとして参照する。",
      "Redshift SpectrumでAuroraデータファイルを直接読む。",
      "Auroraスナップショットを日次でS3へエクスポートし、Spectrumで参照する。"
    ],
    "answer": 1,
    "keypoint": "RDS/Auroraの稼働中データをRedshiftから参照する。",
    "explain": "Federated queryは対応RDS/Auroraを外部スキーマとして参照できる。",
    "elim": "SpectrumはS3向けでAuroraのデータファイルを直接読めない。日次スナップショットエクスポートは頻繁な更新に対して鮮度が不足する。DMS同期は限定的な参照量に対して複製の維持コストが過剰。",
    "origCat": "Redshift・フェデレーション"
  },
  {
    "id": 28,
    "cat": "データストア・モデリング",
    "cards": [
      "Glue Crawler",
      "Glue Data Catalog",
      "スキーマ検出"
    ],
    "scenario": "複数チームがS3へ新しいデータセットを配置します。AthenaとGlueが共通のテーブル定義を参照し、初期段階では人手DDLなしでスキーマとパーティションを検出します。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "CloudTrail PutObjectから列定義を推測する。",
      "AWS Configでオブジェクト内容を評価する。",
      "S3 Inventoryから列データ型を自動生成する。",
      "Glueクローラーを実行し、検出結果をGlue Data Catalogへ登録する。"
    ],
    "answer": 3,
    "keypoint": "スキーマ・パーティション発見と技術カタログ登録。",
    "explain": "Glueクローラーはデータを走査し、形式、スキーマ、パーティションを推測してCatalogを更新する。",
    "elim": "Inventory、Config、CloudTrailはファイル内容のスキーマ検出を行わない。",
    "origCat": "データカタログ"
  },
  {
    "id": 29,
    "cat": "データストア・モデリング",
    "cards": [
      "Partition Projection",
      "Athena",
      "Glue Crawler"
    ],
    "scenario": "日付とリージョンの規則的なS3プレフィックスを使用し、将来値も予測できます。毎日クローラーやALTER TABLEを実行せず、Athenaが条件から対象を算出します。",
    "ask": "必要な設定を2つ選んでください。",
    "options": [
      "各クエリ前にMSCK REPAIR TABLEを実行する。",
      "クローラーを1分ごとに実行する。",
      "Glue Data Catalogへパーティションインデックスを設定する。",
      "日付範囲、リージョン値、S3ロケーションテンプレートを定義する。",
      "Athenaテーブルでpartition projectionを有効にする。"
    ],
    "answer": [
      3,
      4
    ],
    "keypoint": "予測可能なパーティションをクエリ時に計算する。",
    "explain": "Partition Projectionとテンプレートでカタログへの大量登録を減らせる。",
    "elim": "高頻度クローラーやMSCKは登録の管理負荷を残す。パーティションインデックスは登録済みパーティションの検索を速めるだけで、登録作業自体は不要にならない。",
    "origCat": "Athena・パーティション"
  },
  {
    "id": 30,
    "cat": "データストア・モデリング",
    "cards": [
      "S3 Lifecycle",
      "Glacier",
      "有効期限"
    ],
    "scenario": "監査ログは90日間頻繁に参照し、その後7年間保持します。90日後のアクセスは年数回で復元に数時間かかってもよく、7年後は削除します。",
    "ask": "最も運用負荷が低い方法はどれですか。",
    "options": [
      "S3 Intelligent-Tieringを有効にし、7年経過分は手動で削除する。",
      "7年間S3 Standardへ固定し、削除は手作業にする。",
      "Lambdaで毎日年齢を計算してCopy/Deleteする。",
      "Lifecycleで90日後に適切なGlacierクラスへ移行し、7年後に失効させる。"
    ],
    "answer": 3,
    "keypoint": "アクセス頻度と保持期限に応じた自動階層化・削除。",
    "explain": "S3 Lifecycleは年齢に応じた移行と失効を自動化する。",
    "elim": "Intelligent-Tieringには自動削除機能がなく監視料金も発生する。自作Lambdaは運用が増え、Standard固定と手作業削除はコストと確実性に劣る。",
    "origCat": "S3ライフサイクル"
  },
  {
    "id": 31,
    "cat": "データストア・モデリング",
    "cards": [
      "S3 Versioning",
      "Object Lock",
      "WORM"
    ],
    "scenario": "金融取引ファイルを7年間保存します。誤削除・上書きから復元でき、管理者を含む利用者が保持期間中に削除・改ざんできない、書き込み後変更不可（WORM）の要件があります。",
    "ask": "必要な機能を2つ選んでください。",
    "options": [
      "S3 Versioningを有効にする。",
      "MFA Deleteを有効にして削除操作に多要素認証を課す。",
      "S3 Object Lockで保持モードと期間を設定する。",
      "Intelligent-Tieringで上書きを防ぐ。",
      "クロスリージョンレプリケーションで別リージョンへ複製する。"
    ],
    "answer": [
      0,
      2
    ],
    "keypoint": "世代復元はVersioning、WORMはObject Lock。",
    "explain": "Object Lockはバージョニングされたオブジェクトへ保持を適用する。",
    "elim": "MFA Deleteは削除操作に認証を課すが、認証済みの管理者による削除を禁止できずWORMにならない。レプリケーションは複製であり改ざん防止ではない。Intelligent-Tieringは階層化機能。",
    "origCat": "保持・改ざん防止"
  },
  {
    "id": 32,
    "cat": "データストア・モデリング",
    "cards": [
      "DynamoDB TTL",
      "有効期限"
    ],
    "scenario": "一時セッションを作成から30日後に自動削除します。秒単位の厳密な削除時刻は不要で、アプリから定期Deleteを実行しません。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "EventBridge SchedulerとLambdaで期限切れ項目を日次Scan・削除する。",
      "DynamoDB Streamsの保持期間で項目を削除する。",
      "有効期限のepoch秒属性を定義しDynamoDB TTLを有効にする。",
      "PITRの保持期間で古い項目を削除する。"
    ],
    "answer": 2,
    "keypoint": "期限切れ項目の非同期自動削除はTTL。",
    "explain": "TTLは指定時刻を過ぎた項目をバックグラウンドで削除する。",
    "elim": "Scanによる定期削除は読み取りコストと運用が増える。StreamsとPITRの保持期間は項目の有効期限管理機能ではない。",
    "origCat": "DynamoDBライフサイクル"
  },
  {
    "id": 33,
    "cat": "データストア・モデリング",
    "cards": [
      "COPY",
      "UNLOAD",
      "S3"
    ],
    "scenario": "S3の大量ParquetをRedshiftへ並列ロードし、集計結果をS3へParquetで並列出力します。クライアント経由の行単位転送は避けます。",
    "ask": "最も適切な組み合わせはどれですか。",
    "options": [
      "ロードにUNLOAD、出力にCOPYを使用する。",
      "ロードにAWS DMS、出力にAWS DataSyncを使用する。",
      "JDBC INSERTとクライアントPutObjectを使用する。",
      "ロードにCOPY、出力にUNLOADを使用する。"
    ],
    "answer": 3,
    "keypoint": "S3⇄Redshiftの大規模並列移動はCOPYとUNLOAD。",
    "explain": "COPYはロード、UNLOADはS3への並列出力。",
    "elim": "COPYとUNLOADの役割を逆にすると機能しない。JDBC INSERTはリーダーノードを通る行単位転送で並列性に劣る。DataSyncはRedshiftからの出力に使えない。",
    "origCat": "Redshiftロード・アンロード"
  },
  {
    "id": 34,
    "cat": "データストア・モデリング",
    "cards": [
      "Glue Schema Registry",
      "Avro",
      "互換性"
    ],
    "scenario": "複数プロデューサーがAvroイベントを送ります。任意フィールド追加は許可しますが、既存コンシューマーが読めない非互換変更はデプロイ前に防ぎます。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "Glue Data Catalogのテーブルバージョン比較で変更を検出し、通知する。",
      "コンシューマー側で未知フィールドを無視するデシリアライズ処理を実装する。",
      "Kinesisシャード数でスキーマ変更を制御する。",
      "Glue Schema Registryへ登録し、互換性モードで新バージョンを検証する。"
    ],
    "answer": 3,
    "keypoint": "イベントスキーマのバージョンと互換性検証。",
    "explain": "Schema RegistryはAvro等のスキーマを管理し、互換性ルールで検証できる。",
    "elim": "テーブルバージョン比較は事後検出でありデプロイ前の検証にならない。コンシューマー側の回避実装は削除や型変更などの非互換を防げない。シャード数はスキーマ契約と無関係。",
    "origCat": "スキーマ進化"
  },
  {
    "id": 35,
    "cat": "データストア・モデリング",
    "cards": [
      "パーティション",
      "小さいファイル",
      "コンパクション"
    ],
    "scenario": "顧客IDごとに細分化された小さいParquetが大量発生し、Athenaのファイルオープンが支配的です。主要条件は日付とリージョンです。",
    "ask": "最も適切な改善はどれですか。",
    "options": [
      "S3 Intelligent-Tieringでアクセス頻度に応じて階層化する。",
      "日付とリージョン中心に再設計し、小さいファイルを適切なサイズへコンパクションする。",
      "顧客IDでさらに細かく分割する。",
      "Parquetの圧縮方式をgzipへ変更してファイルサイズを小さくする。"
    ],
    "answer": 1,
    "keypoint": "アクセスパターンに合うパーティションとファイルサイズ。",
    "explain": "適切な分割とコンパクションでスキャンとオープン回数を減らせる。",
    "elim": "階層化と圧縮方式変更はファイル数とオープン回数を減らさない。顧客IDでの細分化は小さいファイルをさらに増やす。",
    "origCat": "データレイク最適化"
  },
  {
    "id": 36,
    "cat": "データストア・モデリング",
    "cards": [
      "Apache Iceberg",
      "MERGE",
      "タイムトラベル"
    ],
    "scenario": "S3分析テーブルへ変更データキャプチャ（CDC）を反映します。主キー更新・削除、過去時点参照、安全なスキーマ進化をAthenaやSparkから扱います。",
    "ask": "最も適切な形式はどれですか。",
    "options": [
      "Apache Icebergを使用する。",
      "日付別CSVへ追記し全クエリで最新行を選ぶ。",
      "Catalogのテーブルバージョンだけで行更新を実現する。",
      "パーティション単位のINSERT OVERWRITEで該当日付のデータを洗い替える。"
    ],
    "answer": 0,
    "keypoint": "データレイク上のACID変更、スナップショット、スキーマ進化。",
    "explain": "Icebergは行レベル変更、スナップショット、スキーマ進化を提供する。",
    "elim": "パーティション洗い替えは行レベル変更のたびに広い書き換えが発生し、過去時点参照も提供しない。CSV追記とCatalogテーブルバージョンはACIDトランザクションではない。",
    "origCat": "オープンテーブル形式"
  },
  {
    "id": 37,
    "cat": "データストア・モデリング",
    "cards": [
      "Amazon S3 Tables",
      "Iceberg",
      "コンパクション"
    ],
    "scenario": "Icebergを採用し、コンパクションや不要スナップショット整理を可能な限りAWSへ任せます。汎用S3上に独自保守ジョブを多数作りません。",
    "ask": "最も適切な選択はどれですか。",
    "options": [
      "SparkのrewriteDataFilesを定期実行する独自保守ジョブを汎用S3上へ構築する。",
      "DynamoDBへメタデータだけ保存し最適化を行わない。",
      "Amazon S3 Tablesを使用する。",
      "S3バッチオペレーションでスナップショット削除とファイル結合を定期実行する。"
    ],
    "answer": 2,
    "keypoint": "Icebergテーブルのマネージド保守。",
    "explain": "S3 TablesはテーブルバケットとIceberg向け保守機能を提供する。",
    "elim": "独自保守ジョブの構築は要件に反する。S3バッチオペレーションはIcebergのスナップショット管理を理解しない。メタデータだけのDynamoDB保存では最適化が行われない。",
    "origCat": "S3 Tables"
  },
  {
    "id": 38,
    "cat": "データストア・モデリング",
    "cards": [
      "MemoryDB",
      "DAX",
      "Redis"
    ],
    "scenario": "Redis互換APIでマイクロ秒級の読み書きを行う主要データベースが必要です。キャッシュではなく、マルチAZ耐久性を持つ記録システムとして使います。",
    "ask": "最も適切なサービスはどれですか。",
    "options": [
      "Amazon MemoryDBを使用する。",
      "ElastiCacheを唯一の永続記録システムとして扱う。",
      "EC2上へRedisクラスターを自己構築し、EBSスナップショットで耐久性を確保する。",
      "DAXを独立したRedis互換DBとして使用する。"
    ],
    "answer": 0,
    "keypoint": "Redis互換かつ耐久性のある主要インメモリDB。",
    "explain": "MemoryDBはRedis互換で耐久性を持ち、主要DBとして利用できる。",
    "elim": "ElastiCacheは主にキャッシュ用途でMemoryDBのようなトランザクションログによる耐久性保証がない。自己構築とスナップショットは継続的なマルチAZ耐久性を満たさない。DAXはDynamoDB専用キャッシュ。",
    "origCat": "インメモリデータストア"
  },
  {
    "id": 39,
    "cat": "データストア・モデリング",
    "cards": [
      "Aurora PostgreSQL",
      "pgvector",
      "HNSW",
      "IVF"
    ],
    "scenario": "Aurora PostgreSQLの業務データに埋め込みを格納します。検索レイテンシと再現率を優先し、構築時間とメモリ増加は許容します。",
    "ask": "最も適切なインデックスはどれですか。",
    "options": [
      "埋め込みをOpenSearch Serviceへ複製してk-NN検索する。",
      "軽量性だけを優先したIVF設定を使用する。",
      "通常のB-treeでコサイン距離近似を行う。",
      "pgvectorのHNSWインデックスを使用する。"
    ],
    "answer": 3,
    "keypoint": "高検索性能と再現率を優先する条件はHNSW。",
    "explain": "HNSWは高い検索性能・再現率を得やすいがメモリと構築コストが大きい。",
    "elim": "OpenSearchへの複製はAurora内へ格納する要件に合わず同期管理が増える。IVFは構築が軽い代わりに検索性能・再現率優先の条件に合わない。B-treeは近傍検索に使えない。",
    "origCat": "ベクトルインデックス"
  },
  {
    "id": 40,
    "cat": "運用・オーケストレーション",
    "cards": [
      "CloudWatch",
      "メトリクス",
      "SNS"
    ],
    "scenario": "Glueジョブの失敗、実行時間急増、DPU消費異常を検知し、しきい値超過時に通知します。人がログを常時確認しません。",
    "ask": "最も適切な構成はどれですか。",
    "options": [
      "AWS ConfigでETLレコード品質を評価する。",
      "S3 Inventoryでジョブ状態を日次集計する。",
      "CloudTrail管理イベントだけでDPU消費を監視する。",
      "CloudWatchメトリクスとログを収集し、AlarmからSNSへ通知する。"
    ],
    "answer": 3,
    "keypoint": "実行状態・性能監視としきい値通知。",
    "explain": "CloudWatchはメトリクス、ログ、Alarmを統合し、SNS通知できる。",
    "elim": "CloudTrail、Inventory、Configはジョブ性能監視の主役ではない。",
    "origCat": "監視・アラート"
  },
  {
    "id": 41,
    "cat": "運用・オーケストレーション",
    "cards": [
      "CloudTrail",
      "管理イベント",
      "データイベント"
    ],
    "scenario": "誰がGlueジョブ定義を変更したか、誰が特定S3オブジェクトを読んだかを追跡し、主体、時刻、送信元、対象を記録します。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "CloudWatchメトリクスだけから実行者を特定する。",
      "S3サーバーアクセスログとCloudWatchメトリクスで読み取りと変更を追跡する。",
      "CloudTrail管理イベントを記録し、対象S3には必要なデータイベントも有効にする。",
      "ConfigスナップショットだけでS3 GetObject実行者を特定する。"
    ],
    "answer": 2,
    "keypoint": "API監査はCloudTrail。S3オブジェクト操作にはデータイベント。",
    "explain": "管理イベントは構成変更、データイベントはGetObject等を追跡できる。",
    "elim": "S3サーバーアクセスログはベストエフォート配信でGlueジョブ定義の変更を記録しない。CloudWatchメトリクスとConfigスナップショットだけでは操作主体まで追跡できない。",
    "origCat": "監査ログ"
  },
  {
    "id": 42,
    "cat": "運用・オーケストレーション",
    "cards": [
      "AWS Config",
      "構成履歴",
      "コンプライアンス"
    ],
    "scenario": "S3暗号化やパブリックアクセスブロックが、いつどの状態から変わったかを確認し、規定状態への違反を継続評価します。",
    "ask": "最も適切なサービスはどれですか。",
    "options": [
      "AWS Configで構成履歴を記録し、Configルールで準拠評価する。",
      "Macieで全ポリシー変更差分を記録する。",
      "CloudTrailの管理イベントをAthenaで分析し、変更操作を特定する。",
      "Glue Data Catalogでバケット設定を管理する。"
    ],
    "answer": 0,
    "keypoint": "リソース構成の時系列変更と準拠評価。",
    "explain": "AWS Configは構成項目を記録し、ルールで望ましい状態を評価する。",
    "elim": "CloudTrail分析は変更操作の特定はできるが、望ましい状態への継続的な準拠評価機能がない。MacieとData Catalogは構成変更履歴の管理サービスではない。",
    "origCat": "構成変更追跡"
  },
  {
    "id": 43,
    "cat": "運用・オーケストレーション",
    "cards": [
      "冪等性",
      "Job Bookmarks",
      "再試行"
    ],
    "scenario": "一時障害後に日次パイプラインを再開します。同じ入力を二重登録せず、失敗ステップだけを安全に再実行します。",
    "ask": "適切な設計を2つ選んでください。",
    "options": [
      "Glueジョブブックマークや処理済み状態で増分入力を追跡する。",
      "再試行回数を無制限にし副作用を考慮しない。",
      "失敗時は常に全履歴を削除して再作成する。",
      "業務キーや入力ファイルIDで書き込みを冪等にする。",
      "再試行ごとにランダム主キーを付ける。"
    ],
    "answer": [
      0,
      3
    ],
    "keypoint": "冪等な書き込みと増分状態追跡。",
    "explain": "同じ入力の結果を一意にし、処理済み状態を管理すれば重複を抑えて再開できる。",
    "elim": "全再作成、ランダムキー、無制限再試行は安全な再実行にならない。",
    "origCat": "安全な再実行"
  },
  {
    "id": 44,
    "cat": "運用・オーケストレーション",
    "cards": [
      "Glue Data Quality",
      "DQDL",
      "CloudWatch"
    ],
    "scenario": "主キー一意性、必須列完全性、金額範囲をETL前後で自動検査します。ルールをコードから分離し、結果をメトリクス監視します。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "検証ロジックをLambdaで実装し、各ETLジョブのコードへ組み込む。",
      "Glue Data QualityでDQDLルールを定義し、結果をCloudWatchへ公開する。",
      "CloudTrailでNULL率と重複率を計算する。",
      "Glueクローラーだけで値の一意性と範囲を保証する。"
    ],
    "answer": 1,
    "keypoint": "データ値の品質ルールと評価はGlue Data Quality。",
    "explain": "DQDLで完全性、一意性、範囲等を定義し、結果を監視へ連携できる。",
    "elim": "コードへの組み込みはルール分離の要件に反する。クローラーはスキーマ検出であり値の検査をしない。CloudTrailはAPI監査でありデータ品質計算をしない。",
    "origCat": "データ品質"
  },
  {
    "id": 45,
    "cat": "変換・ETL",
    "cards": [
      "Athena CTAS",
      "Parquet",
      "パーティション"
    ],
    "scenario": "生JSONから必要列を抽出・型変換し、日付パーティションのParquet派生データをS3へ作ります。別Sparkクラスターは用意しません。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "EMRクラスターを起動し、Sparkジョブで変換する。",
      "S3 LifecycleでJSONをParquetへ移行する。",
      "Athena CTASでParquet形式とパーティションを指定する。",
      "クローラーでデータ本体をParquetへ変換する。"
    ],
    "answer": 2,
    "keypoint": "SQL結果を新しいS3テーブルへ書き出すCTAS。",
    "explain": "CTASはSELECT結果から形式・圧縮・パーティションを指定したテーブルを作れる。",
    "elim": "EMRは追加のSparkクラスター運用が発生し要件に反する。クローラーとLifecycleはデータ本体の形式変換をしない。",
    "origCat": "Athena・変換"
  },
  {
    "id": 46,
    "cat": "データストア・モデリング",
    "cards": [
      "Materialized View",
      "集計",
      "BI"
    ],
    "scenario": "BIが同じ大規模テーブルから日次・地域別集計を繰り返します。数分の鮮度遅延は許容し、再計算量を減らします。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "更新のたびにCTASで集計テーブル全体を作り直す。",
      "Redshiftマテリアライズドビューへ頻出集計を定義する。",
      "毎回Spectrumで全件再集計する。",
      "通常ビューで参照のたびに全集計する。"
    ],
    "answer": 1,
    "keypoint": "頻出高コスト集計と多少の鮮度遅延。",
    "explain": "Materialized Viewは結果を保存し、繰り返し計算を減らす。",
    "elim": "通常ビュー、Spectrum全件再集計、CTASでの全体再作成はいずれも毎回の再計算量を減らさない。",
    "origCat": "Redshift高速化"
  },
  {
    "id": 47,
    "cat": "変換・ETL",
    "cards": [
      "データスキュー",
      "ソルティング",
      "Spark UI"
    ],
    "scenario": "大部分のSparkタスクは数分で終わりますが、特定結合キーを処理する数タスクだけ長時間残ります。片方のテーブルも大きくブロードキャストできません。",
    "ask": "最も適切な対策はどれですか。",
    "options": [
      "両巨大テーブルを各Executorへブロードキャストする。",
      "全データを1パーティションへcoalesceする。",
      "シャッフルパーティション数を増やして全体の並列度を上げる。",
      "偏ったキーにソルト値を付け、複数パーティションへ分散する。"
    ],
    "answer": 3,
    "keypoint": "一部キーへの集中はデータスキュー。",
    "explain": "ソルティングで偏ったキーを分散し、特定タスクへの集中を緩和できる。",
    "elim": "シャッフルパーティション増加は同一キーへの集中を分散できない。1パーティション化は並列性を失い、巨大テーブルのブロードキャストはメモリ不足を招く。",
    "origCat": "Spark性能"
  },
  {
    "id": 48,
    "cat": "変換・ETL",
    "cards": [
      "コンパクション",
      "S3",
      "Athena"
    ],
    "scenario": "S3に数KBのParquetが毎日数百万個でき、AthenaとSparkのファイル一覧・オープン処理が遅くなっています。",
    "ask": "適切な改善策を2つ選んでください。",
    "options": [
      "上流のバッファサイズや配信間隔を調整して生成ファイルを大きくする。",
      "定期Glue/Sparkジョブで小ファイルを適切なサイズへまとめる。",
      "S3プレフィックスを分散させてリクエストの並列性能を高める。",
      "Deep Archiveへ移してAthenaで直接読む。",
      "Parquetの行グループサイズを小さくして読み取り並列度を上げる。"
    ],
    "answer": [
      0,
      1
    ],
    "keypoint": "既存ファイルのコンパクションと上流対策。",
    "explain": "ファイル数を減らし、生成時から適切なサイズにするとオープン処理を減らせる。",
    "elim": "プレフィックス分散や行グループ縮小はファイル数とオープン回数を減らさない。Deep ArchiveのオブジェクトはAthenaから直接読めない。",
    "origCat": "小さいファイル問題"
  },
  {
    "id": 49,
    "cat": "変換・ETL",
    "cards": [
      "Managed Scaling",
      "EC2 Spot",
      "コアノード"
    ],
    "scenario": "夜間Spark処理の必要容量は変動します。Spotでコストを下げつつ、中断でHDFSの重要データを失わないようにします。",
    "ask": "最も適切な構成はどれですか。",
    "options": [
      "最大On-Demand容量を常時起動する。",
      "EMR Managed Scalingを使い、タスクノード中心にSpotを使い、重要コア容量は必要に応じOn-Demandにする。",
      "コアノードを全てSpotにし、HDFSブロックを保持させる。",
      "マスターノードだけをSpotにする。"
    ],
    "answer": 1,
    "keypoint": "変動容量はManaged Scaling、Spotは中断耐性のある容量へ。",
    "explain": "タスクノード中心にSpotを使い、重要なコア容量を保護するとコストと可用性を両立できる。",
    "elim": "コア全Spot化は中断でHDFSデータを失うリスクがある。マスターSpotはクラスター全体の停止を招く。最大On-Demand固定はアイドルコストが大きい。",
    "origCat": "EMRコスト・可用性"
  },
  {
    "id": 50,
    "cat": "変換・ETL",
    "cards": [
      "層化抽出",
      "少数クラス",
      "代表性"
    ],
    "scenario": "不正取引は全体の0.1%です。検証用1%サンプルに正常・不正の各グループを一定割合で確実に含めます。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "単純無作為の割合をさらに下げる。",
      "正常・不正の層に分け、各層から抽出する。",
      "毎回同じ時刻範囲だけを取る。",
      "取引金額の大きい順に上位1%を抽出する。"
    ],
    "answer": 1,
    "keypoint": "少数グループの代表性は層化抽出。",
    "explain": "各層から抽出することで希少クラスを確実に含められる。",
    "elim": "金額順や固定時刻範囲の抽出は偏りを生む。単純無作為抽出では割合を変えても希少クラスの包含を保証できない。",
    "origCat": "サンプリング"
  },
  {
    "id": 51,
    "cat": "運用・オーケストレーション",
    "cards": [
      "SageMaker Catalog",
      "リネージ",
      "データ製品"
    ],
    "scenario": "BI指標がどのS3データ、Glueジョブ、変換結果を経由したかを追跡し、上流変更の影響を確認します。所有者とデータ製品説明も共有します。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "CloudTrailのAPI履歴からジョブと出力の依存関係を手動で整理する。",
      "SageMaker Catalogでデータ資産、所有者、データ製品、リネージを管理する。",
      "S3タグだけへSQL全文を保存する。",
      "Glueジョブの実行ログへ上流テーブル名を出力して検索可能にする。"
    ],
    "answer": 1,
    "keypoint": "データ製品、所有者、系統の統合管理。",
    "explain": "SageMaker Catalogはデータ資産の発見、ガバナンス、リネージを支援する。",
    "elim": "CloudTrailの手動整理やログ出力の自作管理は網羅性と継続性に欠け、所有者やデータ製品説明の共有もできない。S3タグへのSQL保存は体系的な系統管理にならない。",
    "origCat": "データリネージ"
  },
  {
    "id": 52,
    "cat": "運用・オーケストレーション",
    "cards": [
      "Step Functions",
      "実行履歴",
      "CloudWatch Logs"
    ],
    "scenario": "Step Functionsが一部入力で失敗します。どの状態で、どの入力・出力を受け、どのエラーで分岐したかを確認します。",
    "ask": "最も適切な調査方法はどれですか。",
    "options": [
      "CloudTrailの管理イベントから実行の入出力を復元する。",
      "S3 Storage Lensだけで分岐条件を推測する。",
      "Step Functions実行履歴と関連CloudWatch Logsを確認する。",
      "Glue Catalogのテーブルバージョンから入力を復元する。"
    ],
    "answer": 2,
    "keypoint": "状態遷移と入出力は実行履歴で追う。",
    "explain": "実行履歴には状態、入出力、エラー、再試行が記録される。",
    "elim": "CloudTrailは実行開始のAPI呼び出しを記録するが、状態ごとの入出力や分岐エラーは追えない。Storage LensとCatalogは実行トレースではない。",
    "origCat": "ワークフロー障害解析"
  },
  {
    "id": 53,
    "cat": "運用・オーケストレーション",
    "cards": [
      "コスト配分タグ",
      "CUR",
      "Athena"
    ],
    "scenario": "共有アカウントのGlue、EMR、S3、Redshift費用を部門・データ製品・環境別に配賦し、詳細明細をSQL分析します。",
    "ask": "最も適切な設計はどれですか。",
    "options": [
      "Cost Explorerのサービス別月次レポートをエクスポートして部門へ配賦する。",
      "S3 InventoryだけでDPUとRedshift料金を推定する。",
      "全リソースを同じタグにして均等割りする。",
      "一貫したコスト配分タグを付け、Cost and Usage ReportをS3へ出力してAthenaで分析する。"
    ],
    "answer": 3,
    "keypoint": "属性別配賦はタグ、詳細明細はCUR。",
    "explain": "タグ付きCURをS3へ出力すれば、利用量と料金をSQL分析できる。",
    "elim": "Cost Explorerのサービス別集計では部門・データ製品単位の詳細明細とSQL分析ができない。Inventoryは料金推定に使えず、均等割りは利用実態を反映しない。",
    "origCat": "コスト可視化"
  },
  {
    "id": 54,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "IAMロール",
      "Glue",
      "S3"
    ],
    "scenario": "Glueジョブは入力バケットの特定プレフィックスを読み、出力プレフィックスへ書きます。長期アクセスキーをコードへ保存せず、必要な操作だけを許可します。",
    "ask": "最も適切な権限設計はどれですか。",
    "options": [
      "入力・出力バケットのバケットポリシーでアカウント内の全プリンシパルへ読み書きを許可する。",
      "サービスロールへs3:*をResource:*で付与する。",
      "IAMユーザーを作成し、必要なS3操作を許可したうえでアクセスキーをジョブ引数で渡す。",
      "Glueサービスロールへ対象プレフィックスの必要なS3操作だけを許可する。"
    ],
    "answer": 3,
    "keypoint": "サービスロールと最小権限。",
    "explain": "必要なS3アクションと対象だけをロールへ許可すれば長期キーなしで実行できる。",
    "elim": "アカウント内全プリンシパル許可とs3:*のワイルドカードは最小権限に反する。IAMユーザーの長期アクセスキーは引数経由でも漏えいとローテーションの管理負荷が残る。",
    "origCat": "IAM・最小権限"
  },
  {
    "id": 55,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "KMS",
      "キーポリシー",
      "IAM"
    ],
    "scenario": "アカウントAのS3データは顧客管理KMSキーで暗号化されています。アカウントBの分析ロールへ復号だけを許可します。S3側は許可済みですがkms:Decryptで拒否されます。",
    "ask": "最も適切な修正はどれですか。",
    "options": [
      "Bの分析ロールのIAMポリシーへkms:Decryptを追加するだけで対応する。",
      "AのキーポリシーでBの利用を許可し、Bのロールにもkms:Decryptを許可する。",
      "Bに同じエイリアス名の別キーを作る。",
      "Lifecycleで既存暗号文を自動的にSSE-S3へ変換する。"
    ],
    "answer": 1,
    "keypoint": "クロスアカウントKMSは所有側キーポリシーと利用側IAMの両方。",
    "explain": "キー所有者の許可と利用ロールのDecrypt権限が必要。",
    "elim": "利用側IAMポリシーだけではキーポリシー側が未許可のため拒否が続く。同名エイリアスの別キーでは既存暗号文を復号できない。LifecycleはSSE-KMSからSSE-S3への再暗号化を行わない。",
    "origCat": "クロスアカウント暗号化"
  },
  {
    "id": 56,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "SSE-KMS",
      "SSE-S3",
      "監査"
    ],
    "scenario": "規制データのキー使用履歴を監査し、キー無効化、ローテーション、利用権限をデータアクセスとは別に制御します。",
    "ask": "最も適切な暗号化方式はどれですか。",
    "options": [
      "AWS管理キー（aws/s3）を使うSSE-KMSを設定する。",
      "顧客管理KMSキーを使うSSE-KMSを設定する。",
      "AWS CloudHSMで独自にキーを管理し、クライアント側暗号化を実装する。",
      "SSE-S3とオブジェクトACLだけでKMSキー権限を管理する。"
    ],
    "answer": 1,
    "keypoint": "独立したキー制御と使用監査は顧客管理キーのSSE-KMS。",
    "explain": "顧客管理KMSキーならキーポリシー、無効化、ローテーション、CloudTrail監査を利用できる。",
    "elim": "AWS管理キーはキーポリシーの編集や無効化ができない。SSE-S3はキー使用の個別監査と権限分離ができない。CloudHSMと独自実装は要件に対して運用負荷が過剰。",
    "origCat": "保存時暗号化"
  },
  {
    "id": 57,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "クライアント側暗号化",
      "TLS",
      "エンベロープ暗号化"
    ],
    "scenario": "AWSへ送信する前にデータを暗号化し、AWSサービスへ平文を渡さない要件があります。大量データ向けの効率的で安全な鍵管理も必要です。",
    "ask": "適切な対策を2つ選んでください。",
    "options": [
      "顧客管理KMSキーを使うSSE-KMSで保存時暗号化を設定する。",
      "KMSのEncrypt APIで各データオブジェクト全体を直接暗号化する。",
      "TLSだけで送信し、到着後は平文でも転送前暗号化とみなす。",
      "クライアント側で暗号化してから送信する。",
      "KMSデータキーを使うエンベロープ暗号化を採用する。"
    ],
    "answer": [
      3,
      4
    ],
    "keypoint": "データ自体の事前暗号化と安全な鍵分離。",
    "explain": "クライアント側暗号化とエンベロープ暗号化で、平文送信を避けつつ大容量データを効率的に保護できる。",
    "elim": "SSE-KMSはサーバー側暗号化でありAWSへ平文が渡る。KMS Encrypt APIは4KBまでの直接暗号化で大量データに不向き。TLSは通信路の暗号化であり保存前のデータ暗号化ではない。",
    "origCat": "転送前暗号化"
  },
  {
    "id": 58,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "LF-Tags",
      "Lake Formation",
      "Data Catalog"
    ],
    "scenario": "数千のテーブルと列を機密度、地域、部門で分類し、新規テーブルごとに個別ARNをポリシーへ追記せず権限管理します。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "新規テーブル作成を検知し、IAMポリシーへテーブルARNを自動追記するLambdaを実装する。",
      "S3オブジェクトタグだけでAthena列権限を自動生成する。",
      "全オブジェクトARNをIAMへ手作業列挙する。",
      "Lake FormationでLF-Tagsを定義し、カタログ資産へ付与してタグベース権限を設定する。"
    ],
    "answer": 3,
    "keypoint": "データレイク資産の分類ベース認可はLF-Tags。",
    "explain": "LF-Tagベース制御はデータベース、テーブル、列へ分類に基づく権限を適用できる。",
    "elim": "S3オブジェクトタグはカタログの列レベル権限に連動しない。ARNの手動列挙も自動追記も、ポリシー肥大化と追記漏れのリスクが残りスケールしない。",
    "origCat": "Lake Formation・タグ認可"
  },
  {
    "id": 59,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "Lake Formation",
      "データフィルター",
      "列権限"
    ],
    "scenario": "同じ顧客テーブルを複数部門がAthenaで利用します。マーケティングには個人列を隠し、地域担当には自地域の行だけを見せます。データ複製は避けます。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "部門ごとにバケット全体をコピーする。",
      "部門ごとに必要な列と行だけを抽出した派生テーブルを日次ジョブで作成する。",
      "Athenaワークグループ上限で行と列を制御する。",
      "Lake Formationの列レベル権限とデータフィルターを使用する。"
    ],
    "answer": 3,
    "keypoint": "同一テーブルへの行・列レベル制御。",
    "explain": "Lake Formationは列権限と行フィルターを統合サービスへ適用できる。",
    "elim": "バケットコピーと派生テーブルはデータ複製を避ける要件に反し、鮮度管理も増える。Athenaワークグループはクエリ管理の単位であり行・列の認可機能ではない。",
    "origCat": "行・列レベル認可"
  },
  {
    "id": 60,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "Amazon Macie",
      "PII",
      "S3"
    ],
    "scenario": "多数のS3バケットからカード番号、個人番号、メールアドレスなどを継続発見し、意図しない公開や配置を調査します。",
    "ask": "最も適切なサービスはどれですか。",
    "options": [
      "CloudTrail PutObjectだけでPIIを分類する。",
      "AWS Configでオブジェクト本文を正規表現評価する。",
      "Amazon Macieで機密情報検出ジョブとバケット評価を実行する。",
      "Amazon GuardDutyのS3保護機能で機密情報の配置を検出する。"
    ],
    "answer": 2,
    "keypoint": "S3の機密データ発見はMacie。",
    "explain": "Macieはパターンと機械学習でS3内の機密情報を検出する。",
    "elim": "GuardDutyのS3保護は不審なアクセスの脅威検出であり本文のPII分類はしない。ConfigとCloudTrailはオブジェクト内容を分類しない。",
    "origCat": "機密データ検出"
  },
  {
    "id": 61,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "Secrets Manager",
      "ローテーション",
      "RDS"
    ],
    "scenario": "GlueとLambdaがRDSへ接続します。認証情報をコードへ固定せず暗号化保存し、定期ローテーションし、実行ロールから必要時だけ取得します。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "Lambdaレイヤーへ埋め込み更新時だけ手動変更する。",
      "Secrets Managerへ保存しローテーションを設定し、実行ロールへGetSecretValueを許可する。",
      "Systems Manager Parameter StoreのSecureStringへ保存し、ローテーションは手動で行う。",
      "平文の標準パラメータへ保存し全員へ読み取りを許可する。"
    ],
    "answer": 1,
    "keypoint": "DB秘密情報の保管、ローテーション、IAM取得。",
    "explain": "Secrets Managerは暗号化保管とローテーションを提供する。",
    "elim": "SecureStringは暗号化保存できるがマネージドな定期ローテーション機能がない。レイヤー埋め込みと平文の全員共有は漏えいリスクが高い。",
    "origCat": "シークレット管理"
  },
  {
    "id": 62,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "S3 Gateway Endpoint",
      "VPC",
      "NAT"
    ],
    "scenario": "プライベートサブネットのGlueとEC2からS3へ大量アクセスします。インターネットやNATを通さず、特定バケットに限定し、NAT料金も減らします。",
    "ask": "最もコスト効率のよい構成はどれですか。",
    "options": [
      "S3 Gateway VPC Endpointを作成し、ルートとエンドポイントポリシーを設定する。",
      "EC2へパブリックIPを付ける。",
      "S3用のInterface VPC Endpoint（AWS PrivateLink）を作成する。",
      "各サブネットにNAT Gatewayを追加する。"
    ],
    "answer": 0,
    "keypoint": "VPCからS3へのプライベート低コスト接続。",
    "explain": "Gateway EndpointはS3への内部経路とポリシー制御を提供する。",
    "elim": "Interface Endpointでもプライベート接続は可能だが、時間課金とデータ処理料金が発生し無料のGateway Endpointよりコストが高い。NAT追加とパブリックIPはインターネット回避・NAT料金削減の要件に反する。",
    "origCat": "プライベート接続"
  },
  {
    "id": 63,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "S3 Access Points",
      "VPC限定",
      "共有バケット"
    ],
    "scenario": "1つのS3データレイクを数十アプリが共有します。アプリごとに異なるプレフィックス・操作を許可し、一部は特定VPCに限定します。単一巨大バケットポリシーは避けます。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "Transfer Accelerationのエンドポイントで権限分離する。",
      "S3 Inventory設定を認可ポリシーにする。",
      "アプリごとにS3 Access Pointを作り、個別ポリシーとVPC制限を設定する。",
      "単一のバケットポリシーへアプリごとのプレフィックス別ステートメントを追記して管理する。"
    ],
    "answer": 2,
    "keypoint": "共有バケットへのアプリ別入口とポリシー。",
    "explain": "S3 Access Pointsは個別エンドポイントとポリシーを提供する。",
    "elim": "単一ポリシーへの追記はサイズ上限と管理複雑性の問題が残り、要件で避けるとされている。Transfer AccelerationとInventoryは認可機能ではない。",
    "origCat": "S3アクセス分離"
  },
  {
    "id": 64,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "データ主権",
      "SCP",
      "AWS Config",
      "リージョン"
    ],
    "scenario": "規制により、データ、ログ、バックアップ、暗号鍵を指定国内リージョン外へ保存・複製できません。誤操作を防ぎ、違反を継続検出します。",
    "ask": "適切な対策を2つ選んでください。",
    "options": [
      "CloudFrontエッジを唯一の永続保存先にする。",
      "全バケットで国外へのCross-Region Replicationを有効にする。",
      "CloudTrailで全リージョンの操作を記録し、違反は事後に手動で是正する。",
      "資産を許可リージョン内に配置し、AWS Configなどで継続評価する。",
      "SCPやIAMで許可リージョン外の関連API操作を制限する。"
    ],
    "answer": [
      3,
      4
    ],
    "keypoint": "適切な配置、予防ガードレール、継続検出。",
    "explain": "SCP/IAMでリージョン外操作を抑止し、Config等で状態を評価する。",
    "elim": "国外へのレプリケーションとエッジ保存は主権要件に反する。事後の手動是正だけでは誤操作の予防にならない。",
    "origCat": "データ主権"
  },
  {
    "id": 65,
    "cat": "セキュリティ・ガバナンス",
    "cards": [
      "IAM ABAC",
      "プリンシパルタグ",
      "リソースタグ"
    ],
    "scenario": "数百のジョブとS3 Access Pointをproject、environment、department属性で認可します。新プロジェクトごとに個別ポリシーを作らず、主体とリソースのタグ一致時だけ許可します。",
    "ask": "最も適切な方法はどれですか。",
    "options": [
      "リソース名の命名規則とポリシーのワイルドカードでプロジェクト別に許可する。",
      "Lake Formation行フィルターだけで全AWSリソース権限を管理する。",
      "プロジェクト作成時にIAMポリシーを自動生成するパイプラインを整備する。",
      "IAM ABACでプリンシパルタグとリソースタグを条件比較する。"
    ],
    "answer": 3,
    "keypoint": "AWSリソース全般を属性一致で認可するABAC。",
    "explain": "ABACは少数の汎用ポリシーでタグに基づくスケーラブルな認可を実現する。",
    "elim": "命名規則ワイルドカードは命名依存で脆く、environment等の複数属性を表現しにくい。ポリシー自動生成は個別ポリシーを作らない要件に反する。Lake Formationの行フィルターはデータレイク資産向けでAWSリソース全般の認可ではない。",
    "origCat": "属性ベース認可"
  }
];
