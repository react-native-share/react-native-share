using Newtonsoft.Json.Linq;
using ReactNative.Bridge;
using System;
using Windows.ApplicationModel.Core;
using Windows.Foundation;
using Windows.UI.Core;
using DataTransfer = Windows.ApplicationModel.DataTransfer;

namespace Cl.Json.RNShare
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNShareModule : NativeModuleBase
    {
        private DataTransfer.DataTransferManager _dataTransferManager;

        private string _title;
        private string _text;
        private string _url;

        /// <summary>
        /// Instantiates the <see cref="RNShareModule"/>.
        /// </summary>
        internal RNShareModule()
        {
            _dataTransferManager = DataTransfer.DataTransferManager.GetForCurrentView();
        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNShare";
            }
        }

        /// <summary>
        /// Open Share UI and provide data for sharing.
        /// </summary>
        /// <param name="options"></param>
        [ReactMethod]
        public void open(JObject options)
        {
            if (options != null)
            {
                _title = options.Value<string>("title");
                _text = options.Value<string>("share_text");  
                _url = options.Value<string>("share_URL");

                if (_text == null && _title == null && _url == null) return;

                RunOnDispatcher(() =>
                {
                    _dataTransferManager.DataRequested += new TypedEventHandler<DataTransfer.DataTransferManager, 
                        DataTransfer.DataRequestedEventArgs>(this.DataRequested);

                    DataTransfer.DataTransferManager.ShowShareUI();
                });
            } 
        }

        private void DataRequested(DataTransfer.DataTransferManager sender, DataTransfer.DataRequestedEventArgs e)
        {
            if (_title != null)
            {
                e.Request.Data.Properties.Title = _title;
            }
            if (_text != null)
            {
                e.Request.Data.SetText(_text);
            }
            if (_url != null)
            {
                e.Request.Data.SetUri(new Uri(_url));
            }

            _dataTransferManager.DataRequested -= DataRequested;
        }

        /// <summary>
        /// Run action on UI thread.
        /// </summary>
        /// <param name="action">The action.</param>
        private static async void RunOnDispatcher(DispatchedHandler action)
        {
            await CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, action);
        }
    }
}